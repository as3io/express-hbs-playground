const express = require('express');
const helmet = require('helmet');
const hbs = require('./hbs');
const routes = require('./routes');

const app = express();
app.set('trust proxy', 'loopback, linklocal, uniquelocal');

app.use(helmet());

app.engine('hbs', hbs.express4({
  defaultLayout: `${__dirname}/views/layouts/default`,
  partialsDir: `${__dirname}/views/partials`,
}));
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

app.get('/', (req, res) => {
  res.json({ ping: 'pong' });
});

routes(app);

module.exports = app;
