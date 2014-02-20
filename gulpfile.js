var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    express = require('express'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    lrserver = lr(),
    server = express(),
    livereloadport = 35729,
    serverport = 5000;

server.use(livereload({
    port: livereloadport
}));
server.use(express.static(__dirname + '/dist/'));
    
gulp.task('styles', function() {
  return gulp.src('src/sass/main.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(livereload(lrserver));
});

gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(livereload(lrserver));
});

//gulp.task('images', function() {
//  return gulp.src('src/img/**/*')
//    .pipe(cache(imageop({ optimizationLevel: 5, progressive: true, interlaced: true })))
//    .pipe(gulp.dest('dist/assets/img'))
//    .pipe(livereload(lrserver));
//});

gulp.task('clean', function() {
  return gulp.src(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], {read: false})
    .pipe(clean());
});

gulp.task('serve', function() {
  server.listen(serverport);
 
  lrserver.listen(livereloadport);
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});

gulp.task('watch', function() {

    gulp.start('serve');
  
    // Watch .scss files
    gulp.watch('src/sass/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('src/js/**/*.js', ['scripts']);

    // Watch image files
    // gulp.watch('src/img/**/*', ['images']);

	
});