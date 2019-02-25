const section = require('./section');

module.exports = (app) => {
  app.use('/', section);
};
