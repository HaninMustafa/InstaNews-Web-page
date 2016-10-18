var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload,
    plumber = require('gulp-plumber'),
    eslint = require('gulp-eslint'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    notify=require('gulp-notify');

var plumberErrorHandler={
      errorHandler: notify.onError({
        title: 'Gulp',
        message: 'Error: <%= error.message %>'//will see a notification if not able to load gulp
      })
    };

////////////////////////////////////////////////////////
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(["build/css/*.css", "build/js/*.js"]).on("change", reload);
});
///////////////////////////////////////////////////////
gulp.task('scripts', function () {
gulp.src('./js/*.js')
    .pipe(eslint())
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./build/js'));
  });
  ///////////////////////////////////////////////////////

  gulp.task('lint', function() {
    return gulp.src(['./js/*.js','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
  /////////////////////////////////////////////////////
  gulp.task('sass', function() {
   gulp.src('./sass/style.scss')
      .pipe(plumber(plumberErrorHandler))
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./build/css'))
      .pipe(cssnano())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./build/css'));
});

//////////////////////////////////////////////////////////

gulp.task('watch', function() {
  gulp.watch('js/*.js', ['scripts', 'lint']); // gulp eslint
  gulp.watch("sass/*.scss", ['sass']); //gulp sass
});


gulp.task('default', ['watch', 'browser-sync']);
