const { Router } = require('express');
const gql = require('graphql-tag');
const createError = require('http-errors');
const asyncRoute = require('../utils/async-route');
const defaultFragment = require('../gql/fragments/with-website-section');
const extractFragmentData = require('../utils/extract-fragment-data');
const sectionPath = require('../utils/section-path');

const buildQuery = ({ fragment } = {}) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData({ fragment });
  return gql`
    query WithWebsiteSection($input: WebsiteSectionAliasQueryInput!, $redirect: WebsiteSectionRedirectQueryInput!) {
      websiteSectionAlias(input: $input) {
        ...WithWebsiteSectionFragment
        ${spreadFragmentName}
      }
      websiteSectionRedirect(input: $redirect) {
        id
        alias
      }
    }
    ${defaultFragment}
    ${processedFragment}
  `;
};

const router = Router();

router.get('/:alias(*)', asyncRoute(async (req, res) => {
  const { alias } = req.params;
  const { apollo } = req;

  if (!alias) {
    // No website alias was provided. Return a 404.
    throw createError(404, 'No website section alias was provided.');
  }

  // Query for the website section using the alias, via the injected apollo client.
  const input = { alias };
  const variables = { input, redirect: input };
  const { data } = await apollo.query({ query: buildQuery(), variables });

  const { websiteSectionAlias, websiteSectionRedirect } = data;

  if (websiteSectionAlias) {
    // The website section was found. Return it along with the canonical path.
    const canonicalPath = sectionPath(alias);
    return res.render('section', { section: websiteSectionAlias, canonicalPath });
  }

  if (websiteSectionRedirect && websiteSectionRedirect.alias) {
    // A redirect was found for this section alias. Force a redirect.
    const { alias: redirectAlias } = websiteSectionRedirect;
    const path = sectionPath(redirectAlias);
    return res.redirect(301, path);
  }

  // No website section or redirect was found for this alias. Return a 404.
  throw createError(404, `No website section was found for alias '${alias}'`);
}));

module.exports = router;
