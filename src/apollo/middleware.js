const createClient = require('./create-client');

module.exports = config => (req, res, next) => {
  req.apollo = createClient(config);
  next();
};
