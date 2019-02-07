const got = require('got');
const _ = require('underscore');
const Q = require('q');

const metascraper = require('metascraper')([
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-title')(),
  require('metascraper-url')()
]);

const web = require('../webClient');

const getAttachment = ({ title, description, image, url }) => {
  let res = { url, title, title_link: image, thumb_url: image };
  if (!_.isEmpty(description)) {
    res.fields = [{ title: 'Description', value: description }]
  }
  return res;
};

const getUnfurls = (data) => _.chain(data).map(getAttachment).indexBy('url').value();

const message = ({ channel, message_ts: ts, links = [] }) => {
  const promises = _.map(links, async ({ url }) => {
    const { body: html, url: link } = await got(url);
    const data = await metascraper({ html, url: link });
    return { ...data, url };
  });

  return Q.all(promises).then(data => {
    const unfurls = getUnfurls(data, 'url');
    web.chat.unfurl({ channel, ts, unfurls }).catch(console.error);
  });
};

module.exports = message;