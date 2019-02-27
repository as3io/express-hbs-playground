const section = require('./section');
const home = require('./home');

module.exports = (app) => {
  app.get('/', home);
  app.get('/:alias(*)', section);
};
