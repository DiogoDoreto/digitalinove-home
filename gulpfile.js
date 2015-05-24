var gulp = require('gulp');
var browserSync = require('browser-sync').create();


gulp.task('templates', function () {
  var jade = require('gulp-jade');
  return gulp.src('src/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('dist'));
});

gulp.task('templates-watch', ['templates'], browserSync.reload.bind(browserSync));


gulp.task('css', function () {
  var stylus = require('gulp-stylus');
  var postcss = require('gulp-postcss');
  return gulp.src('src/**/*.styl')
    .pipe(stylus())
    .pipe(postcss([require('lost')(), require('autoprefixer')()]))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});


gulp.task('images', function () {
  var imagemin = require('gulp-imagemin');
  return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images/'));
});


gulp.task('serve', ['templates', 'css', 'images'], function () {
  browserSync.init({
    server: {
      baseDir: './dist/'
    },
    host: '0.0.0.0'
  });

  gulp.watch('src/**/*.styl', ['css']);
  gulp.watch('src/**/*.jade', ['templates-watch']);
});


gulp.task('default', ['serve'], function () {});

