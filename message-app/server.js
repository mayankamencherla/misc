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
app.post('/messages', (req, res) => {

    // TODO: Add more validations
    if (!req.body.hasOwnProperty('message')) {
        console.log('Invalid request by the client');

        res.status(400);

        res.json({
            success: false,
            message: 'Message not sent by the client in the request'
        })
    } else {

        const digest = mp.process(req.body.message);

        res.json({
            success: true,
            digest : digest
        });
    }
});

app.get('/messages/:digest', (req, res) => {

    // TODO: Add more validations
    if (!req.params.hasOwnProperty('digest')) {
        console.log('Invalid request by the client');

        res.status(400);

        res.json({
            success: false,
            message: 'Message digest not sent by the client in the request'
        })
    } else {

        const message = mp.getMessage(req.params.digest);

        res.json({
            success: true,
            message: message
        });
    }
});

app.listen(3000, () => {
    console.log('App started on port 3000');
});

module.exports = app;