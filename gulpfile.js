require('babel/polyfill');

// Hack for gulp.watch() -> dependency hell -> super-old version of LoDash
Object.getPrototypeOf.toString = function() { return Object.toString(); };

var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var babel  = require('gulp-babel');
var jas    = require('gulp-jasmine');

var paths = {
  src:      ['src/**.js', 'src/*/**.js'],
  dest:     'build',
  specSrc:  'spec/*Spec.js',
  specDest: 'build/spec',
  spec:     'build/spec/*Spec.js'
};

function build(src, dest, min) {
  var stream = gulp.src(src).pipe(babel());
  return (min ? stream.pipe(uglify()) : stream).pipe(gulp.dest(dest));
}

gulp.task('build-src', function() {
  return build(paths.src, paths.dest, false);
});

gulp.task('build-test', function() {
  return build(paths.specSrc, paths.specDest);
});

gulp.task('test', ['build'], function() {
  return gulp.src(paths.spec).pipe(jas({ includeStackTrace: true }));
});

gulp.task('watch', function() {
  return gulp.watch([paths.src, paths.specSrc], ['test']);
});

gulp.task('build', ['build-src', 'build-test']);

gulp.task('default', ['test']);

gulp.on('err', function(e) {
  console.log("Gulp error:", e.err.stack);
});
