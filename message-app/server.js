// 3rd party libraries
const express = require('express');
const bodyParser = require('body-parser');

// In app classes
const messageProcessor = require('./messageProcessor');

const app = express();

// JSON API
app.use(bodyParser.json());

// Initiliaze objects
const mp = messageProcessor.Build();

/**
 * Saves the input message and returns a sha256 digest of the message
 * TODO: Move this to a routes folder
 * @param req
 * @param res
 */
app.post('/messages', async (req, res) => {

    // TODO: Add more validations
    if (!req.body.hasOwnProperty('message')) {
        console.log('Invalid request by the client');

        res.status(400);

        res.json({
            success: false,
            message: 'Message not sent by the client in the request'
        })
    } else {

        const digest = await mp.createDigest(req.body.message);

        res.json({
            success: true,
            digest : digest
        });
    }
});

app.get('/messages/:digest', async (req, res) => {

    // TODO: Add more validations
    if (!req.params.hasOwnProperty('digest')) {
        console.log('Invalid request by the client');

        res.status(400);

        res.json({
            success: false,
            message: 'Message digest not sent by the client in the request'
        })
    } else {

        var messageRow = await mp.getMessage(req.params.digest);

        var success = true;

        let message;

        if (messageRow == undefined) {
            res.status(404);

            success = false;

            message = "Digest passed in request not found in server";
        } else {
            message = messageRow.message;
        }

        res.json({
            success,
            message
        });
    }
});

app.listen(3000, () => {
    console.log('App started on port 3000');
});

module.exports = app;