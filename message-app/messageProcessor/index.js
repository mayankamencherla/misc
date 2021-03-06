const crypto = require('crypto');

// In built classes
const Messages = require('../models/messages.js');
const Configuration = require('../configuration');

class MessageProcessor {
    constructor() {
        this.messageModel = Messages.Build();
        this.config = Configuration.Build();
    }

    /**
     * Returns a new instance of the class
     * @return MessageProcessor
     */
    static Build() {
        return new MessageProcessor();
    }

    /**
     * Processes the incoming message
     * @param message
     * @return SHA256 Digest
     */
    async createDigest(message) {
        console.log('Processing the incoming message: ' + message);

        const secret = this.config.get('SHA_SECRET');

        const hash = crypto.createHmac('sha256', secret)
                           .update(message)
                           .digest('hex');

        const success = await this.messageModel.addDigest(message, hash);

        return {
            success,
            hash
        }
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