const { SafeString } = require('express-hbs');

const { NODE_ENV, LIVERELOAD_PORT, LIVERELOAD_PATH } = process.env;

module.exports = () => {
  if (NODE_ENV !== 'development') return '';
  const url = `http://0.0.0.0:${LIVERELOAD_PORT}`;
  return new SafeString(`
    <script src="${url}${LIVERELOAD_PATH}/socket.io.js"></script>
    <script>
      (function(io) {
        var socket = io('${url}', { transports: ['websocket'], path: '${LIVERELOAD_PATH}', reconnectionAttempts: 5 });
        socket.on('process-ready', function() { window.location.reload() });
      })(io);
    </script>
  `);
};
