const {
  task,
  watch,
  src,
  parallel,
} = require('gulp');
const eslint = require('gulp-eslint');
const cache = require('gulp-cached');
const { spawn } = require('child_process');
const http = require('http');
const socketio = require('socket.io');

const { log } = console;

const { LIVERELOAD_PORT } = process.env;
const server = http.createServer();
const io = socketio(server, { path: '/_lr' });
server.listen(LIVERELOAD_PORT);

io.on('connection', () => log('> Web browser connected to livereload.'));

let node;

const serve = async () => {
  if (node) node.kill();
  node = await spawn('node', ['src/index.js'], { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] });
  node.on('message', (msg) => {
    if (msg === 'ready') io.emit('process-ready');
  });
  node.on('close', (code, signal) => {
    log(`> Node subprocess (via Gulp) exited with code ${code} signal ${signal}`);
  });
};

const lint = () => src(['src/**/*.js'])
  .pipe(cache('lint'))
  .pipe(eslint())
  .pipe(eslint.format());

task('default', () => {
  watch(
    ['src/**/*.js', 'src/**/*.hbs'],
    { queue: false, ignoreInitial: false },
    parallel([serve, lint]),
  );
});
