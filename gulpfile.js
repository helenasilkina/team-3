var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jscs = require('gulp-jscs');

var path = {
  pub: {
    js: 'public/js/*.js',
    css: 'public/css/*.css'
  },
  dist: {
    js: 'dist/js',
    css: 'dist/css'
  }
};

gulp.task('hint', function() {
  gulp.src(path.pub.js)
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(gulp.dest(path.dist.js));
});

gulp.task('jscs', function () {
  return gulp.src(path.pub.js)
      .pipe(jscs());
});

gulp.task('minify', function(){
  gulp.src(path.pub.js)
      .pipe(concat('all.js'))
      .pipe(gulp.dest(path.dist.js))
      .pipe(rename('all.min.js'))
      .pipe(uglify())
});

gulp.task('styles', function() {
  return gulp.src(path.pub.css)
      .pipe(autoprefixer('last 2 version'))
      .pipe(gulp.dest(path.dist.css))
      .pipe(rename({suffix: '.min'}))
      .pipe(minifycss())
      .pipe(gulp.dest(path.dist.css))
});

gulp.task('default', function(){
  gulp.start('jscs', 'hint', 'minify', 'styles');

  gulp.watch(path.pub.js, function(){
    gulp.start('jscs', 'hint', 'minify');
  });

  gulp.watch(path.pub.css, function(){
    gulp.start('styles');
  });
});