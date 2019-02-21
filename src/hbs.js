const hbs = require('express-hbs');
const delay = require('./utils/delay');

hbs.registerAsyncHelper('delay', (ms, cb) => {
  delay(ms).then(cb);
});

module.exports = hbs;
