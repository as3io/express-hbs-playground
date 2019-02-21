const express = require('express');
const helmet = require('helmet');

const app = express();
app.set('trust proxy', 'loopback, linklocal, uniquelocal');

app.use(helmet());

app.get('/', (req, res) => {
  res.json({ ping: 'pong' });
});

module.exports = app;
