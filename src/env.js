const {
  cleanEnv,
  port,
} = require('envalid');

module.exports = cleanEnv(process.env, {
  INTERNAL_PORT: port({ desc: 'The internal port that express will run on.', default: 80 }),
  EXTERNAL_PORT: port({ desc: 'The external port that express is exposed on.', default: 80 }),
});
