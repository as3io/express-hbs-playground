const hbs = require('express-hbs');
const delay = require('./utils/delay');

const { NODE_ENV, LIVERELOAD_PORT } = process.env;

hbs.registerHelper('livereload', () => {
  if (NODE_ENV !== 'development') return '';
  const url = `http://0.0.0.0:${LIVERELOAD_PORT}`;
  return new hbs.SafeString(`
    <script src="${url}/_lr/socket.io.js"></script>
    <script>
      (function(io) {
        var socket = io('${url}', { transports: ['websocket'], path: '/_lr', reconnectionAttempts: 5 });
        socket.on('process-ready', function() { window.location.reload() });
      })(io);
    </script>
  `);
});

hbs.registerAsyncHelper('delay', (ms, cb) => {
  delay(ms).then(cb);
});

module.exports = hbs;
