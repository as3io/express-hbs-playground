const delay = require('../../utils/delay');
const randomRange = require('../../utils/random-range');

module.exports = function parentBlock(options, cb) {
  const ms = randomRange(50, 150);
  delay(ms).then(() => {
    cb(options.fn(this, { blockParams: [{ time: ms }] }));
  });
};
