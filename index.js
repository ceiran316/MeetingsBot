require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const SlackBot = require('slackbots'); // import slackbot library

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

//grunt
module.exports = function(grunt) {
 
  // Project configuration.
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'sass/styles.scss': 'css/styles.css'
        }
      }
    },
 
    autoprefixer: {
      single_file: {
        options: {
          browsers: ['last 2 version', 'ie 8', 'ie 9']
        },
        src: 'css/styles.css',
        dest: 'css/styles.css'
      },
    },
 
    watch: {
      sass: {
        files: 'sass/*.scss',
        tasks: ['sass', 'autoprefixer'],
      }
    },
  });
 
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
 
  // Default task
  grunt.registerTask('default', ['watch']);
};