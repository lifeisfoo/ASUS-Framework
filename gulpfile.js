var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    cmq = require('gulp-combine-media-queries'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    express = require('express'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    uncss = require('gulp-uncss'),
    glob = require('glob'),
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
    .pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9'))
    //.pipe(uncss({
    //  html: glob.sync('dist/**/*.html'),
    //  ignore: [/is-/, /not-/]
    //}))
    .pipe(cmq({
      log: true
    }))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(livereload(lrserver));
});

gulp.task('scripts', function() {
  return gulp.src(['src/js/vendor/**/*.js', 'src/js/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(livereload(lrserver));
});

gulp.task('clean', function() {
  return gulp.src(['dist/assets/css', 'dist/assets/js'], {read: false})
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

});