const site = require('../site/config');


module.exports = (req, res) => {
  res.render('home', {
    canonicalPath: '/',
    site,
    requestOrigin: `${req.protocol}://${req.get('host')}`,
  });
};
