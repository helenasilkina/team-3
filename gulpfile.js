var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css');

var es = require('event-stream');

gulp.task('hint', function() {
  gulp.src('public/js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(gulp.dest('dist/js'));
});

gulp.task('minify', function(){
  gulp.src('public/js/*.js')
      .pipe(concat('all.js'))
      .pipe(gulp.dest('dist/js'))
      .pipe(rename('all.min.js'))
      .pipe(uglify())
});

gulp.task('styles', function() {
  return gulp.src('public/css/*.css')
      .pipe(autoprefixer('last 2 version'))
      .pipe(gulp.dest('dist/css'))
      .pipe(rename({suffix: '.min'}))
      .pipe(minifycss())
      .pipe(gulp.dest('dist/css'))
});

gulp.task('default', function(){
  gulp.start('hint', 'minify', 'styles');

  gulp.watch("public/js/*.js", function(){
    gulp.start('hint', 'minify');
  });

  gulp.watch("public/css/*.css", function(){
    gulp.start('styles');
  });
});