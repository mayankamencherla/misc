const knex = require('knex')(require('./../knexfile'));
const uuid = require('uuid/v1');

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
     */
    async addDigest(message, digest) {

        console.log('Attempting to add digest and message to the DB');

        // TODO: Check if {message, digest} in cache

        // Check if {message, digest} in table
        const found = await this.getMessage(digest);

        if (found !== undefined) return;

        const id = uuid();

        // TODO: Retry 3 times
        await knex('messages')
                .insert({
                    id,
                    message,
                    digest
                })
    }

    /**
     * Gets a message using the digest
     * @param digest
     */
    async getMessage(digest) {

        console.log('Attempting to fetch message using digest');

        const message = await knex('messages')
                                .where({ digest })
                                .first();

        return message;
    }
}

module.exports = Messages;