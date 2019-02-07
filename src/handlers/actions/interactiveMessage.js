const _ = require('underscore');
const queryStrings = require('query-string');

const { snoozeSelection, tryButtons } = require('./interactive')

const interactiveMessage = (req, res) => {
    const body = queryStrings.parse(req.body.toString());
    console.log('Received interactiveMessage body', body);
    const payload = JSON.parse(body.payload);

    const { callback_id } = payload;

    switch(callback_id) {
        case 'try_buttons': {
            tryButtons(req, res);
            break;
        }
        case 'snooze_selection': {
            snoozeSelection(req, res);
            break;
        }
        default:
    }
}

module.exports = interactiveMessage;