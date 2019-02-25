const cleanPath = require('./clean-path');
const getConfig = require('../../config');

/**
 * Determines if an alias should go to the index/home page.
 *
 * @param {string} alias
 */
const shouldGoToIndex = (alias) => {
  const path = cleanPath(alias);
  if (path === 'home' || path === '') return true;
  return false;
};

/**
 * Generates the website section route name.
 *
 * By default, if the section alias were `tactical/firearms`, this method
 * would generate `/section/tactical/firearms`.
 *
 * In the above example, if `sectionRoutePrefix` was empty, this would
 * generate `/tactical/firearms`
 *
 * @param {string} alias The website section alias
 */
module.exports = (alias) => {
  if (shouldGoToIndex(alias)) return '/';
  const path = cleanPath(alias);

  // Load the section route prefix from the runtime config.
  const { publicRuntimeConfig } = getConfig();
  const { sectionRoutePrefix } = publicRuntimeConfig;
  if (!sectionRoutePrefix) return `/${path}`;
  return `/${cleanPath(sectionRoutePrefix)}/${path}`;
};
