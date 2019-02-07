const queryStrings = require('query-string');
const _ = require('underscore');

const web = require('../../webClient');

const commands = (req, res) => {
    const body = queryStrings.parse(req.body.toString());
    console.log('slashCommands -> body', body);
    const { command, user_id: user, channel_id: channel, text, trigger_id } = body;
  
    if(command === '/hello') {
      console.log('HELLO');
    }
  
    console.log('TCL: commands -> text', text);
    switch(text) {
      case 'users': {
        console.log('GET USERS');
        web.users.list().then(res => {
          const { members } = res;
          const people = _.reject(members, user => user.is_bot);
          console.log('USERS', people);
        }).catch(e => console.log('ERROR', e));
        res.send();
        break;
      }
        case 'image': {
            web.chat.postMessage({
                channel,
                attachments: [{
                    title: 'Adding an Image',
                    author_name: 'William Holmes',
                    author_icon: 'https://api.watsonwork.ibm.com/photos/e8e73f40-ba74-102b-8a1d-c574ebd76cf3?modifiedToken=2018-09-03T13:03:38.059+0000',
                    image_url: 'http://i.imgur.com/OJkaVOI.jpg?1'
                }]
            });
            res.send();
            break;
        }
        case 'fields': {
            web.chat.postMessage({
                channel,
                attachments: [{
                    title: 'Adding Fields',
                    fields: [
                        {
                            title: 'Field 1',
                            value: 'Value 1',
                            short: true
                        },
                        {
                            title: 'Field 2',
                            value: 'value 2',
                            short: true
                        }
                    ]
                }]
            });
            res.send();
            break;
        }
        case 'private': {
            web.chat.postEphemeral({
                user,
                channel,
                text: 'This message is only for you'
            });
            res.send();
            break;
        }
        case 'text': {
            web.chat.postMessage({
                channel,
                text: 'This is some text with an attachment',
                attachments: [{
                    title: 'Adding attachment Text with a Title',
                    text: '*bold* `code` _italic_ ~strike~ :smile:'
                }]
            });
            res.send();
            break;
        }
        case 'hello': {
            web.chat.postMessage({
                channel,
                text: 'hello world'
            });
            res.send();
            break;
        }
        case 'buttons': {
            web.chat.postMessage({
                channel,
                text: 'Try out these buttons',
                attachments: [{
                    title: 'Would you recommend the Slack API?',
                    callback_id: 'try_buttons',
                    color: '#3AA3E3',
                    attachment_type: 'default',
                    actions: [{
                        name: 'decision',
                        value: 'yes',
                        style: 'primary',
                        text: 'Yes',
                        type: 'button'
                    }, {
                        name: 'decision',
                        value: 'maybe',
                        text: 'Maybe',
                        type: 'button'
                    }, {
                        name: 'decision',
                        value: 'no',
                        text: 'No Way!',
                        type: 'button',
                        style: 'danger',
                        confirm: {
                            title: 'Are you sure you?',
                            text: 'Maybe you should read the API docs some more.',
                            ok_text: 'Yes, im sure',
                            dismiss_text: 'No, i\'ll take another look'
                        }
                    }]
                }]
            }).catch(console.error);
            res.send();
            break;
        }
        case 'dialog': {
            web.dialog.open({
                trigger_id,
                dialog: {
                    callback_id: 'new-meeting',
                    title: 'My Job Dialog',
                    submit_label: 'Send',
                    notify_on_cancel: false,
                    state: 'Limo',
                    // Max 5 elements
                    elements: [{
                        label: 'Name',
                        name: 'name',
                        type: 'text'
                    }, {
                        label: 'Email Address',
                        name: 'email',
                        placeholder: 'you@example.com',
                        subtype: 'email',
                        type: 'text'
                    }, {
                        label: 'Job Role',
                        name: 'role',
                        type: 'select',
                        data_source: 'external'
                    }, {
                        hint: 'Job Description',
                        label: 'Additional information',
                        name: 'description',
                        type: 'textarea'
                    }, {
                        label: 'Manager',
                        name: 'manager',
                        type: 'select',
                        data_source: 'users'
                    }]
                }
            });
            res.send();
            break;
        }
        case 'new': {
            web.chat.postMessage({
                channel,
                attachments: [{
                    title: 'Create a new meeting?',
                    callback_id: 'try_buttons',
                    color: '#3AA3E3',
                    attachment_type: 'default',
                    actions: [{
                        name: 'decision',
                        value: 'yes',
                        style: 'primary',
                        text: 'Yes',
                        type: 'button',
                        confirm: {
                            title: 'Create meeting?',
                            ok_text: 'Yes, im sure',
                            dismiss_text: 'Cancel'
                        }
                    }, {
                        name: 'decision',
                        value: 'no',
                        text: 'No',
                        type: 'button',
                        style: 'danger',
                    }]
                }]
            }).catch(console.error);
            res.send();
            break;
        }
        case 'update': {
            web.chat.postMessage({
                channel,
                attachments: [{
                    title: 'Update a meeting?',
                    callback_id: 'try_buttons',
                    color: '#3AA3E3',
                    attachment_type: 'default',
                    actions: [{
                        name: 'decision',
                        value: 'yes',
                        style: 'primary',
                        text: 'Yes',
                        type: 'button',
                        confirm: {
                            title: 'Update meeting?',
                            ok_text: 'Yes, im sure',
                            dismiss_text: 'Cancel'
                        }
                      
                    }, {
                        name: 'decision',
                        value: 'no',
                        text: 'No',
                        type: 'button',
                        style: 'danger',
                    }]
                }]
            }).catch(console.error);
            res.send();
            break;
        }
        case 'delete': {
            web.chat.postMessage({
                channel,
                attachments: [{
                    title: 'Delete a meeting?',
                    callback_id: 'try_buttons',
                    color: '#3AA3E3',
                    attachment_type: 'default',
                    actions: [{
                        name: 'decision',
                        value: 'yes',
                        style: 'primary',
                        text: 'Yes',
                        type: 'button',
                        confirm: {
                            title: 'Delete meeting?',
                            ok_text: 'Yes, im sure',
                            dismiss_text: 'Cancel'
                        }
                      
                    }, {
                        name: 'decision',
                        value: 'no',
                        text: 'No',
                        type: 'button',
                        style: 'danger',
                    }]
                }]
            }).catch(console.error);
            res.send();
            break;
        }
        case 'select': {
            web.chat.postEphemeral({
                user,
                channel,
                response_type: 'in_channel',
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
                            value: 'Next_Week'
                        }, {
                            text: 'Next Month',
                            value: 'Next_Month'
                        }]
                    }]
                }]
              });
            res.send();
            break;
        }
        case 'menu': {
            res.send({
                text: 'There are many users in this team',
                response_type: 'in_channel',
                attachments: [{
                    text: 'Explore the Team Members',
                    callback_id: 'pick_sf_neighborhood',
                    actions: [{
                        name: 'neighborhood',
                        text: 'Choose a Member',
                        type: 'select',
                        data_source: 'users'
                    }],
                }]
            })
            break;
        }
        case 'footer': {
            res.send({
                text: 'Here is *MAIN* message some text that appears above an attachment',
                attachments: [{
                    author_name: 'William Holmes',
                    author_link: 'https://workspace-slack-test.slack.com/messages/DDYC9EDN2/team/UDW87UF6U/',
                    author_icon: 'https://ca.slack-edge.com/TDY214B3R-UDW87UF6U-932c98831585-72',
                    title: 'App Code Repo',
                    title_link: 'https://glitch.com/edit/#!/husky-pendulum',
                    text: 'Optional text that appears within the attachment',
                    footer: 'Our Test APP',
                    footer_icon: 'https://platform.slack-edge.com/img/default_application_icon.png',
                    ts: (_.now() / 1000)
                }]
            })
            break;
        }
        default: {
            res.send(`You can use the slash command followed by *new*, *edit*, *remove*, *invitees*, *details*, *dialog*, *select*, *footer*, or *menu*`)
        }
    }
}

module.exports = commands;