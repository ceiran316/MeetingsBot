const { WebClient } = require('@slack/client');

const { OAUTH_TOKEN } = process.env;

let instance;

module.exports = (instance || (instance = new WebClient(OAUTH_TOKEN)));