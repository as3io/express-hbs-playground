const delay = require('../../utils/delay');

module.exports = (ms, cb) => {
  delay(ms).then(cb);
};
