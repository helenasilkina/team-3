var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css');

gulp.task('hint', function() {
  gulp.src('public/js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('minify', function(){
  gulp.src('public/js/*.js')
      .pipe(concat('all.js'))
      .pipe(gulp.dest('dist/js'))
      .pipe(rename('all.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', function() {
  return gulp.src('public/sass/*.scss')
      .pipe(sass({ style: 'expanded' }))
      .pipe(autoprefixer('last 2 version'))
      .pipe(gulp.dest('dist/css'))
      .pipe(rename({suffix: '.min'}))
      .pipe(minifycss())
      .pipe(gulp.dest('dist/css'));
});

gulp.task('default', function(){
  gulp.start('hint', 'minify', 'styles');

  gulp.watch("public/js/*.js", function(){
    gulp.start('hint', 'minify');
  });

  gulp.watch("public/sass/*.scss", function(){
    gulp.start('styles');
  });
});