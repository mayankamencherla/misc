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

        // TODO: Check if {message, digest} in table

        // TODO: Retry 3 times - build a workflow class for this
        await knex('messages')
                .insert({
                    id: uuid(),
                    message: message,
                    digest: digest
                })
    }

    /**
     * Gets a message using the digest
     * @param digest
     */
    async getMessage(digest) {

        console.log('Attempting to fetch message using digest');

        const messageRow = await knex('messages')
                                .where({
                                    digest: digest
                                })
                                .first();

        // TODO: Handle undefined
        const message = messageRow.message;

        return message;
    }
}

module.exports = Messages;