const _ = require('underscore');

const web = require('../webClient');

const message = (...args) => {
  const [{ bot_id, channel, text }] = args;

  if(_.isEqual(bot_id, 'AFF20FKH8')) {
    console.log('IGNORE My Bot Message');
    return
  }

  console.log('MESSAGE Event', args);

  if (_.isEqual(text, 'echo')) {
    web.chat.postMessage({ channel, text }).catch(console.error);
  }
};

  module.exports = message;