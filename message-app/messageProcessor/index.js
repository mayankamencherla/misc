const crypto = require('crypto');

// In built classes
const Messages = require('../models/messages.js');

// TODO: Config
const secret = "cupcakes";

class MessageProcessor {
    constructor() {
        this.messageModel = Messages.Build();
    }

    /**
     * Returns a new instance of the class
     */
    static Build() {
        return new MessageProcessor();
    }

    /**
     * Processes the incoming message
     * @param message
     * @return SHA256 Digest
     */
    async process(message) {
        console.log('Processing the incoming message: ' + message);

        const hash = crypto.createHmac('sha256', secret)
                           .update(message)
                           .digest('hex');

        // TODO: Add to table
        // TODO: Do this async instead of waiting here
        await this.messageModel.addDigest(message, hash);

        return hash;
    }

    /**
     * Returns the message from the sha256 digest
     * @param digest
     * @return message
     */
    async getMessage(digest) {
        console.log('Fetching the message for digest: ' + digest);

        const message = await this.messageModel.getMessage(digest);

        return message;
    }
};

module.exports = MessageProcessor;