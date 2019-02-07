const SLACK = 'https://slack.com';
const SLACK_API = `${SLACK}/api`;

const constants = {
    server: {
        OAUTH_ACCESS: `${SLACK_API}/oauth.access`,
        OAUTH_AUTHORIZE: `${SLACK}/oauth/authorize`,
        CHAT_POST_MESSAGE: `${SLACK_API}/chat.postMessage`
    },
    errorMessages: {
        SIGNING_VERIFICATION_FAILED: 'Slack request signing verification failed'
    },
    errorCodes: {
        SIGNATURE_VERIFICATION_FAILURE: 'SLACK_REQUEST_SIGNATURE_VERIFICATION_FAILURE',
        REQUEST_TIME_FAILURE: 'SLACK_REQUEST_TIMELIMIT_FAILURE'
    },
    responseCodes: {
        OK: 200,
        FAILURE: 500,
        REDIRECT: 302,
        NOT_FOUND: 404
    },
    headers: {
        SLACK_NO_RETRY: 'X-Slack-No-Retry',
        SLACK_POWERED_BY: 'X-Slack-Powered-By',
        SLACK_REQUEST_TIMESTAMP: 'x-slack-request-timestamp',
        SLACK_SIGNATURE: 'x-slack-signature',
        AUTHORIZATION: 'Authorization',
        CONTENT_TYPE: 'Content-type',
        APPLICATION_JSON: 'application/json'
    },
    methods: {
        POST: 'POST',
        GET: 'GET'
    },
    types: {
        URL_VERIFICATION: 'url_verification'
    }
};

module.exports = constants;