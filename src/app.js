const express = require('express');
const helmet = require('helmet');
const hbs = require('./hbs');
const registerHelpers = require('./hbs/helpers');
const routes = require('./routes');

const app = express();
app.set('trust proxy', 'loopback, linklocal, uniquelocal');

app.use(helmet());

registerHelpers(hbs);
app.engine('hbs', hbs.express4({
  contentHelperName: 'content-for',
  defaultLayout: `${__dirname}/views/_document`,
  partialsDir: `${__dirname}/views/partials`,
}));
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

app.get('/', (req, res) => {
  res.json({ ping: 'pong' });
});

routes(app);

module.exports = app;
