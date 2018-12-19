const knex = require('knex')(require('./../knexfile'));
const uuid = require('uuid/v1');
const promiseRetry = require('promise-retry');

/**
 * Wrapper class to interact with messages table
 */
class Messages {
    constructor() {

    }

    static Build() {
        return new Messages();
    }

    /**
     * Adds a digest to the tabe
     * @param message
     * @param digest
     * @return bool
     */
    async addDigest(message, digest) {

        console.log('Attempting to add digest and message to the DB');

        // TODO: Check if {message, digest} in cache

        // Check if {message, digest} in table
        const found = await this.getMessage(digest);

        if (found !== undefined) return true;

        const id = uuid();

        const callback = () => {

            return knex('messages')
                .insert({
                    id,
                    message,
                    digest
                })
        }

        const options = {retries: 3};

        try {
            await promiseRetry((retry, number) => {

                console.log(`Attempt ${number} of inserting into DB`);

                return callback().catch(retry);
            },
            options);
        } catch (e) {
            console.log('Failed to insert message into DB');

            return false;
        }

        return true;
    }

    /**
     * Gets a message using the digest
     * @param digest
     */
    async getMessage(digest) {

        console.log('Attempting to fetch message using digest');

        // Returns the message row if found, else returns undefined
        const message = await knex('messages')
                                .where({ digest })
                                .first();

        return message;
    }
}

module.exports = Messages;