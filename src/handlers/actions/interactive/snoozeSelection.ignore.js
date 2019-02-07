const queryStrings = require('query-string');
const _ = require('underscore');

const web = require('../../../webClient');

const snoozeSelection = (req, res) => {
    const body = queryStrings.parse(req.body.toString());
    console.log('Received snoozeSelection body', body);
    const payload = JSON.parse(body.payload);

    const {
        user: { id: userId },
        actions: [action],
        channel: { id: channel },
        message_ts: ts,
        state
    } = payload;

    const { name } = action;

    console.log("​snoozeSelection -> name", name);

    switch(name) {
        case 'snooze_until': {
            const { selected_options: [{ value }] } = action;
            return res.send({
                channel,
                ts,
                text: 'Snooze *Notifications* for how long?',
                attachments: [{
                    attachment_type: 'default',
                    callback_id: 'snooze_selection',
                    title: 'Notifications',
                    text : `:calendar: muted until: *${value}*`,
                    color: '#3AA3E3',
                    actions: [{
                        name: 'snooze_update',
                        value: 'snooze_update',
                        text: 'Change',
                        type: 'button'
                    }, {
                        name: 'snooze_share',
                        value: `${value}`,
                        text: 'Share with Channel',
                        style: 'primary',
                        type: 'button'
                    }]
                }]
            });
        }
        case 'snooze_update': {
            return res.send({
                channel,
                ts,
                attachments: [{
                    text: 'Snooze *Notifications* for how long?',
                    color: '#3AA3E3',
                    attachment_type: 'default',
                    callback_id: 'snooze_selection',
                    actions: [{
                        name: 'snooze_until',
                        text: 'Snooze until...',
                        type: 'select',
                        options: [{
                            text: 'Tomorrow',
                            value: 'Tomorrow'
                        }, {
                            text: 'Next Week',
                            value: 'Next Week'
                        }, {
                            text: 'Next Month',
                            value: 'Next Month'
                        }]
                    }]
                }]
            });
        }
        case 'snooze_share': {
            const { value } = action;
            web.chat.postMessage({
                channel,
                text: '*Notifications* have been Snoozed',
                attachments: [{
                    attachment_type: 'default',
                    text : `:calendar: muted until: *${value}*`,
                    color: "#3AA3E3",
                }, {
                    footer: `shared by <@${userId}>`,
                    footer_icon: 'https://platform.slack-edge.com/img/default_application_icon.png',
                    ts: (_.now() / 1000)
                }]
            }).catch(console.error);
        }
        default:
          res.send();
    }
}

module.exports = snoozeSelection;