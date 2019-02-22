const http = require('http');
const { createTerminus } = require('@godaddy/terminus');
const app = require('./app');
const log = require('./log');
const pkg = require('../package.json');
const { INTERNAL_PORT, EXTERNAL_PORT } = require('./env');

const server = http.createServer(app);

const run = async () => {
  // Await required services here...
  createTerminus(server, {
    timeout: 1000,
    signals: ['SIGTERM', 'SIGINT', 'SIGHUP', 'SIGQUIT'],
    // Add health checks of services here...
    healthChecks: { '/_health': () => ({ ping: 'pong' }) },
    onSignal: () => {
      log('> Cleaning up...');
      // Stop required services here...
      return Promise.resolve().catch(e => log('> CLEANUP ERRORS:', e));
    },
    onShutdown: () => log('> Cleanup finished. Shutting down.'),
  });

  server.listen(INTERNAL_PORT, () => {
    log(`> Ready on http://0.0.0.0:${EXTERNAL_PORT}`);
    // Emit ready message to parent process (if applicable). For use with livereload in development.
    if (process.send) process.send('ready');
  });
};

process.on('unhandledRejection', (e) => {
  log('> Unhandled promise rejection. Throwing error...');
  throw e;
});

log(`> Booting ${pkg.name} v${pkg.version}...`);
run().catch(up => setImmediate(() => { throw up; }));
