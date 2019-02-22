const compare = require('../../utils/compare-numbers');

module.exports = (...[left, right, { hash } = {}]) => {
  const { forceNumber } = hash;
  return compare('gte', left, right, forceNumber);
};
