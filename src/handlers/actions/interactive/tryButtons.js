const queryStrings = require('query-string');

const web = require('../../../webClient');

const buttonsTest = (req, res) => {
    const body = queryStrings.parse(req.body.toString());
    console.log('Received buttonsTest body', body);
    const payload = JSON.parse(body.payload);

    const {
        user: { id: userId },
        actions: [action],
        channel: { id: channel },
        message_ts: ts,
      trigger_id
    } = payload;

    res.send({
        channel,
        ts,
        text: 'Try out these buttons',
        attachments: [{
            title: 'Feeback',
            text : `Thanks for the Feeback <@${userId}>\n${JSON.stringify(action)}`
        }]
    });
  
            /*  web.dialog.open({
                trigger_id,
                dialog: {
                    callback_id: 'dialog_my_job',
                    title: 'My Job Dialog',
                    submit_label: 'Send',
                    notify_on_cancel: false,
                    state: 'Limo',
                    // Max 5 elements
                    elements: [{
                        label: 'Meeting Name',
                        name: 'name',
                        type: 'text'
                    }, {
                        label: 'Location',
                        name: 'location',
                        subtype: 'email',
                        type: 'text'
                    }, {
                        label: 'Date',
                        name: 'date',
                        type: 'select',
                        data_source: 'external'
                    }, {
                        label: 'Time',
                        name: 'time',
                        type: 'textarea'
                    }, {
                        label: 'Invite',
                        name: 'manager',
                        type: 'select',
                        data_source: 'users'
                    }]
                }
            });*/
}

module.exports = buttonsTest;