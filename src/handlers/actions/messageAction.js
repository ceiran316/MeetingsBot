const queryStrings = require('query-string');

const web = require('../../webClient');

const messageAction = (req, res) => {
    const body = queryStrings.parse(req.body.toString());
    const payload = JSON.parse(body.payload);
    const { channel: { id: channel }, callback_id } = payload;

    res.send();

    switch(callback_id) {
      case 'echo_message': {
        const { message: { text } } = payload;
        web.chat.postMessage({ channel, text }).catch(console.error);
        break;
      }
      default:
    }
  };

  module.exports = messageAction;