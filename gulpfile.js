var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');


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
  var plugins = [
    require('postcss-color-function')(),
    require('lost')(),
    require('autoprefixer')()
  ];
  return gulp.src('src/**/*.{styl,css}')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('dist'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});


gulp.task('images', function () {
  var imagemin = require('gulp-imagemin');
  return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images/'));
});

gulp.task('images-watch', ['images'], browserSync.reload.bind(browserSync));


gulp.task('js', function () {
  var coffee = require('gulp-coffee');
  return gulp.src('src/js/*.coffee')
    .pipe(sourcemaps.init())
    .pipe(coffee())
    .pipe(sourcemaps.write('dist/js/'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.stream());
});


gulp.task('static', function () {
  return gulp.src('src/CNAME')
    .pipe(gulp.dest('dist/'));
});


gulp.task('build', ['templates', 'css', 'images', 'js', 'static']);


gulp.task('serve', ['build'], function () {
  browserSync.init({
    server: {
      baseDir: './dist/'
    },
    host: '0.0.0.0'
  });

  gulp.watch('src/**/*.styl', ['css']);
  gulp.watch('src/**/*.jade', ['templates-watch']);
  gulp.watch('src/images/*', ['images-watch']);
  gulp.watch('src/js/*.coffee', ['js']);
});


gulp.task('deploy', ['build'], function() {
  var ghPages = require('gulp-gh-pages');

  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});


gulp.task('default', ['serve'], function () {});

