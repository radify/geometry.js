require('babel/polyfill');

// Hack for gulp.watch() -> dependency hell -> super-old version of LoDash
Object.getPrototypeOf.toString = function() { return Object.toString(); };

var args   = require('yargs').argv;
var gulp   = require('gulp');
var smaps  = require('gulp-sourcemaps');
var babel  = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jas    = require('gulp-jasmine');

var paths = {
  src:      ['src/**.js', 'src/*/**.js'],
  dest:     'build',
  dist:     'dist',
  specSrc:  'spec/*Spec.js',
  specDest: 'build/spec',
  spec:     'build/spec/*Spec.js'
};

function buildSrc(src, modules) {
  return gulp.src(src).pipe(smaps.init()).pipe(babel({ modules: modules }));
}

function build(src, dest, min) {
  return (min ? buildSrc(src).pipe(uglify()) : buildSrc(src)).pipe(gulp.dest(dest));
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

gulp.task('dist-full', function() {
  var name = 'geometry.js';
  var src  = buildSrc(paths.src, args.modules || 'common');
  return src.pipe(concat(name)).pipe(smaps.write('.')).pipe(gulp.dest(paths.dist));
});

gulp.task('dist-min', function() {
  var name = 'geometry.min.js';
  var src  = buildSrc(paths.src, args.modules || 'common');
  return buildSrc(paths.src).pipe(concat(name)).pipe(uglify()).pipe(gulp.dest(paths.dist));
});

gulp.task('dist', ['dist-full', 'dist-min']);

gulp.task('default', ['test']);

gulp.on('err', function(e) {
  console.log("Gulp error:", e.err.stack);
});
