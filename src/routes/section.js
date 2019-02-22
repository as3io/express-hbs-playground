const { Router } = require('express');
const rand = require('../utils/random-range');

const router = Router();

router.get('/:alias', (req, res) => {
  const { alias } = req.params;

  const times = [
    rand(100, 350),
    rand(100, 350),
    rand(100, 350),
    rand(100, 350),
  ];
  const totalTime = times.reduce((n, v) => n + v, 0);
  const expectedTime = Math.max(...times) + 20;

  res.render('section', {
    title: 'Some title',
    alias,
    times,
    totalTime,
    expectedTime,
  });
});

module.exports = router;
