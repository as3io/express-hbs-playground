const {
  cleanEnv,
  port,
  makeValidator,
} = require('envalid');

const nonemptystr = makeValidator((v) => {
  const err = new Error('Expected a non-empty string');
  if (v === undefined || v === null || v === '') {
    throw err;
  }
  const trimmed = String(v).trim();
  if (!trimmed) throw err;
  return trimmed;
});

module.exports = cleanEnv(process.env, {
  INTERNAL_PORT: port({ desc: 'The internal port that express will run on.', default: 80 }),
  EXTERNAL_PORT: port({ desc: 'The external port that express is exposed on.', default: 80 }),
  GRAPHQL_URL: nonemptystr({ desc: 'The absolute, fully-qualified BaseCMS GraphQL URL.' }),
});
