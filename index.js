require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const SlackBot = require('slackbots'); // import slackbot library
const mongoose = require('mongoose');  // import mongoose library for accessing MongoDB

var http = require('http');
http.createServer((req, res) => {}).listen(1337, '127.0.0.1');

const { createEventAdapter } = require('@slack/events-api');

const { authRedirectHandler, oAuthRedirectHandler } = require('./src/auth');
const { errorEvent, linkEvent, messageEvent } = require('./src/events');
const { actionsHandler, optionsHandler, commandsHandler } = require('./src/handlers');
const { verifySignatureMiddleware } = require('./src/middleware');

const { PORT, SIGNING_SECRET } = process.env;

const slackEvents = createEventAdapter(SIGNING_SECRET, { includeBody: true });

console.log('SIGNING_SECRET', SIGNING_SECRET);

const app = express();

app.use(['/actions', '/commands', '/options'], bodyParser.raw({ type: '*/*' }), verifySignatureMiddleware);

app.use('/events', slackEvents.expressMiddleware());

app.listen(PORT, () => {
    console.log('Example app listening on port ' + PORT);
});

app.get('/test', (req, res) => {
    console.log('Server Test');
    res.send(`OK - Server up and  Running '${req.url}'`);
});

app.get('/', oAuthRedirectHandler);

app.get('/auth/redirect', authRedirectHandler);

app.post('/actions', actionsHandler)

app.post('/commands', commandsHandler);

app.post('/options', optionsHandler);

// Slack Incoming Events

slackEvents.on('message', messageEvent);

slackEvents.on('link_shared', linkEvent);

slackEvents.on('error', errorEvent);

/* Create MongoDB Connection */
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/slackbot', { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));