const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('compile-server', () => {
  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject(ts.reporter.fullReporter()))
    .pipe(sourcemaps.write('.', {sourceRoot: './', includeContent: false}))
    .pipe(gulp.dest('dist'));

});
gulp.task('watch-typescript', () => {
  gulp.watch('src/**/*', ['compile-server']);
});