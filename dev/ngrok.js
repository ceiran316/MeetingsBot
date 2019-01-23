require('dotenv').config()

const ngrok = require('ngrok');

(async function() {
  const url = await ngrok.connect({
    proto: 'http',
    addr: process.env.PORT,
    region: 'us'
  });
  console.log(`\nWEBHOOK URL: ${url}/oauth\n`);
})();
