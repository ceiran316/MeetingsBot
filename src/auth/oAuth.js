const queryStrings = require('query-string');

const constants = require('../constants');

const oAuth = (req, res) => {
    const { APP_SCOPE: scope, CLIENT_ID: client_id } = process.env;
    const query = queryStrings.stringify({ client_id, scope });
    res.redirect(`${constants.server.OAUTH_AUTHORIZE}?${query}`);
}

module.exports = oAuth;
