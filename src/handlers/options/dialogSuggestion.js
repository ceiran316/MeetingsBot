const _ = require('underscore');
const queryStrings = require('query-string');

const startsWith = (str1, str2) => str1.toLocaleLowerCase().startsWith(str2.toLocaleLowerCase())

const filterOptions = (data, value) => _.filter(data, ({ options }) => {
  return !value || _.some(options, ({ label }) => startsWith(label, value));
})

const dialogSuggestions = (req, res) => {
  const body = queryStrings.parse(req.body.toString());
  console.log('Received ACTIONS CALLBACK', body);
  const payload = JSON.parse(body.payload);
  const { callback_id } = payload;

  switch(callback_id) {
    case 'dialog_my_job': {
      const { name, value = '' } = payload;
      if (_.isEqual(name, 'role')) {
        const option_groups = filterOptions([{
            label: 'A',
            options: [{
              label: 'Accountant',
              value: 'accountant'
            }]
          }, {
            label: 'B',
            options: [{
              label: 'Barista',
              value: 'barista'
            }]
          }], value);
        return res.send({ option_groups });
      }
    }
    default: {
      res.send();
    }
  }
};

module.exports = dialogSuggestions;