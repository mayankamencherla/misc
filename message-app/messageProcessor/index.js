const crypto = require('crypto');

// Config
const secret = "cupcakes";

class MessageProcessor {
    constructor() {

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
    process(message) {
        console.log('Processing the incoming message: ' + message);

        const hash = crypto.createHmac('sha256', secret)
                           .update(message)
                           .digest('hex');

        return hash;
    }

    /**
     * Returns the message from the sha256 digest
     * @param digest
     * @return message
     */
    getMessage(digest) {
        console.log('Fetching the message for digest: ' + digest);

        const message = "foo";

        return message;
    }
};

module.exports = MessageProcessor;