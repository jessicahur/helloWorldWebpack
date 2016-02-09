var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');

gulp.task('mocha', function() {
  return gulp.src(['test/*.js'], {read: false})
              .pipe(mocha({reporter: 'list'}))
              .on('error', gutil.log);
});

gulp.task('lint', function() {
  return gulp.src(['*.js', 'test/*.js'], {read: false})
              .pipe(jshint('.jshintrc'))
              .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch-mocha', function() {
  gulp.watch(['./**', 'test/**','!package.json'], ['lint','mocha']);
});

gulp.task('default', ['lint', 'mocha']);

gulp.task('testing', ['lint', 'mocha', 'watch-mocha']);
