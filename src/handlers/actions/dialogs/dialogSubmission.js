const isEmail = require('isemail');
const queryStrings = require('query-string');

const web = require('../../../webClient');

const dialogSubmission = (req, res) => {
    const body = queryStrings.parse(req.body.toString());
    const payload = JSON.parse(body.payload);
    const { callback_id } = payload;

    console.log('TCL: dialogSubmission -> callback_id', callback_id);

    res.send();

    switch(callback_id) {
      case 'new-meeting': {
        const { channel: { id: channel }, user: { id: user }, submission: { email = '' }, submission } = payload;
        if (!isEmail.validate(email)) {
          return res.send({
            errors: [{
              name: 'email',
              error: "Invalid Email Address"
            }]
          });
        }
        web.chat.postEphemeral({ user, channel, text: JSON.stringify(submission) }).catch(console.error);
        break;
      }
      default:
    }
  };

  module.exports = dialogSubmission;