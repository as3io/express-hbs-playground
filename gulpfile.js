const {
  task,
  watch,
  src,
  parallel,
} = require('gulp');
const eslint = require('gulp-eslint');
const cache = require('gulp-cached');
const { spawn } = require('child_process');

const { log } = console;

let node;

const serve = async () => {
  if (node) node.kill();
  node = await spawn('node', ['src/index.js'], { stdio: 'inherit' });
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
    ['src/**/*.js'],
    { queue: false, ignoreInitial: false },
    parallel([serve, lint]),
  );
});
