const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('compile-server', () => {
  console.log('Compiling Server code.');
  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject(ts.reporter.fullReporter()))
    .pipe(sourcemaps.write('.', {sourceRoot: './', includeContent: false}))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch-typescript', ['compile-server'],  () => {
  const stream = nodemon({
    script: 'bin/dev',
    ext: '*',
    watch: 'src/**/*',
    tasks: ['compile-server']
  });
  return stream;
  // gulp.watch('src/**/*', ['compile-server']);
});
