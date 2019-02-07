const queryStrings = require('query-string');

const dialogSuggestion = (req, res) => {
    const body = queryStrings.parse(req.body.toString());
    const payload = JSON.parse(body.payload);
    const { callback_id } = payload;

    console.log('dialogSuggestion -> callback_id', callback_id);

    res.send();

    switch(callback_id) {
      default:
    }
  };

  module.exports = dialogSuggestion;