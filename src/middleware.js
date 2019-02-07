const { verifyRequestSignature } = require('@slack/events-api');
const constants = require('./constants');

const verifySignatureMiddleware = (req, res, next) => {
  const { SIGNING_SECRET: signingSecret } = process.env;
  const { SLACK_SIGNATURE, SLACK_REQUEST_TIMESTAMP } = constants.headers;
  const { [SLACK_SIGNATURE]: requestSignature, [SLACK_REQUEST_TIMESTAMP]: requestTimestamp } = req.headers;

  try {
    if (!verifyRequestSignature({ signingSecret, requestSignature, requestTimestamp, body: req.body })) {
      throw new Error('Slack signature not verified');
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(401);
    return;
  }

  next();
};

module.exports = {
  verifySignatureMiddleware
};
