const delay = require('./delay');
const eq = require('./eq');
const gt = require('./gt');
const gte = require('./gte');
const livereload = require('./livereload');
const log = require('./log');
const lt = require('./lt');
const lte = require('./lte');
const placeholderAd = require('./placeholder-ad');
const replace = require('./replace');

module.exports = (hbs) => {
  hbs.registerAsyncHelper('delay', delay);

  hbs.registerHelper('eq', eq);
  hbs.registerHelper('gt', gt);
  hbs.registerHelper('gte', gte);
  hbs.registerHelper('livereload', livereload);
  hbs.registerHelper('log', log);
  hbs.registerHelper('lt', lt);
  hbs.registerHelper('lte', lte);
  hbs.registerHelper('placeholder-ad', placeholderAd);
  hbs.registerHelper('replace', replace);
};
