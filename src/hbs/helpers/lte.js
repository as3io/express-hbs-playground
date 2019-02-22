const compare = require('../../utils/compare-numbers');

module.exports = (...[left, right, { hash } = {}]) => {
  const { forceNumber } = hash;
  return compare('lte', left, right, forceNumber);
};
