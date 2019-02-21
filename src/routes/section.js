const { Router } = require('express');

const router = Router();

router.get('/:alias', (req, res) => {
  const { alias } = req.params;
  res.render('section', {
    title: 'Some title',
    alias,
  });
});

module.exports = router;
