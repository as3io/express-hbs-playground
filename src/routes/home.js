const { Router } = require('express');
const site = require('../site/config');

const router = Router();

router.get('/', (req, res) => {
  res.render('home', {
    canonicalPath: '/',
    site,
    requestOrigin: `${req.protocol}://${req.get('host')}`,
  });
});

module.exports = router;
