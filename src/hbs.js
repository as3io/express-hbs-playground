const hbs = require('express-hbs');
const delay = require('./utils/delay');

hbs.registerAsyncHelper('sectionQuery', (ms, cb) => {
  delay(ms).then(cb);
});

module.exports = hbs;
