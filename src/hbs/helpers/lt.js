const compare = require('../../utils/compare-numbers');

module.exports = (...[left, right, { hash } = {}]) => {
  const { forceNumber } = hash;
  return compare('lt', left, right, forceNumber);
};
