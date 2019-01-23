const request = require('request');

const constants = require('../constants');

const { OAUTH_TOKEN, TEAM_ID, CLIENT_ID: client_id, CLIENT_SECRET: client_secret } = process.env;

const authorizations = {
    [TEAM_ID]: OAUTH_TOKEN
};

const auth = (req, res) => {
    // When a user authorizes an app, a code query parameter is passed on the oAuth endpoint. If that code is not there, we respond with an error message
    const { query: { code } } = req;
    if (!code) {
      res.status(constants.responseCodes.FAILURE);
      res.send({ 'Error': 'Looks like we\'re not getting code.' });
      console.log('Looks like we\'re not getting code.');
    } else {
        request({
            url: constants.server.OAUTH_ACCESS,
            qs: { code , client_id, client_secret },
            method: constants.methods.GET,
        }, (error, response, body) => {
            if (error) {
                console.log(`[ERROR] ${error}`);
            } else {
                const { access_token, team_id } = JSON.parse(body);
                authorizations[team_id] = access_token;
                console.log('oAuth Successful', body);
                res.send('oAuth Successful');
            }
        })
    }
}

module.exports = auth;
