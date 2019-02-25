const { ApolloClient } = require('apollo-client');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { createHttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');
const { GRAPHQL_URL } = require('../env');

const rootConfig = {
  connectToDevTools: false,
  ssrMode: true,
};

module.exports = config => new ApolloClient({
  ...config,
  ...rootConfig,
  link: createHttpLink({ uri: GRAPHQL_URL, fetch }),
  cache: new InMemoryCache(),
});
