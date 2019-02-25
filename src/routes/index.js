const section = require('./section');
const home = require('./home');

module.exports = (app) => {
  app.use('/', home);
  app.use('/:alias(*)', section);
};
