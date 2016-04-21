var gulp = require('gulp');
var compass = require('gulp-compass');
var gutil = require('gulp-util');
var notify = require("gulp-notify");
var scriptsDir = './client';
var buildDir = './public/js';
console.log(process.env.NODE_ENV)

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function styles() {
  var opt = {
    config_file: './sass/config.rb',
    css: './public',
    sass: 'sass'
  }
  var preprocess = function() {
    gutil.log('Compiling Sass');
    return gulp.src('sass/main.scss')
      .pipe(compass(opt).on('error', handleErrors))
      .pipe(gulp.dest('public/'))
      .pipe(notify({
        message: "CSS Compiling Done."
      }))
  }
  return preprocess()
}

gulp.task('default', function() {
  styles()
  return gulp.watch('sass/*.scss', styles);
});