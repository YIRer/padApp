// module
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    // uglify = require('gulp-uglify'),
    // rename = require('gulp-rename'),
    // cleanCss = require('gulp-clean-css'),
    // imagemin = require('gulp-imagemin'),
    scss = require('gulp-sass'),
    sourcemap = require('gulp-sourcemaps'),
    del = require('del');
    // ejs = require("gulp-ejs");
// browserSync = require('browser-sync');

// scss config

var scssOptions = {
  outputStyle : "expanded",
  indentType : "tab",
  indentWidth : 1,
  precision: 6,
  sourceComments: true };
// Path
var dir = {
  src:"./work",
  dist:"./public"
};

var src ={
  js : dir.src + "/js/**/*.js",
  css : dir.src + "/css/**/*.css",
  scss : dir.src + "/scss/**/*.scss",
  html : dir.src + "/html/**/**/*.html"
};

var dist = {
  js : dir.dist + "/js",
  css : dir.dist + "/css",
  html : dir.dist + "/html"
};

gulp.task('default',['html', 'js', 'scss', 'css','watch'], function() {
  console.log("gulp Start!");
});

gulp.task('js',function(){
          del(['./public/js/*']);
  return  gulp.src(src.js)
          // .pipe(concat('master.js'))
          // .pipe(gulp.dest(dist.js))
          // .pipe(uglify())
          // .pipe(rename('master.min.js'))
          .pipe(gulp.dest(dist.js));
          // .pipe(browserSync.reload( {stream : true} ));
});

gulp.task('css',function(){
          del(['./public/css/*']);
  return  gulp.src([src.css])
          // .pipe(concat('master.css'))
          // .pipe(gulp.dest(dist.css))
          // .pipe(cleanCss())
          // .pipe(rename('master.min.css'))
          .pipe(gulp.dest(dist.css));
          // .pipe(browserSync.reload( {stream : true} ));
});

gulp.task('html',function(){
          del(['./public/html/*']);
  return  gulp.src(src.html)
          .pipe(gulp.dest(dist.html));
          // .pipe(browserSync.reload( {stream : true} ));
});

gulp.task('scss', function () {
  return gulp .src(src.scss)
              .pipe(sourcemap.init())
              .pipe(scss(scssOptions).on('error', scss.logError))
              .pipe(sourcemap.write())
              .pipe(gulp.dest(dist.css));
              // .pipe(browserSync.reload( {stream : true} ));
});

gulp.task('watch',function(){
  var watcher = {
        js: gulp.watch(src.js, ['js']),
        css: gulp.watch(src.css, ['css']),
        scss : gulp.watch(src.scss, ['scss']),
        html: gulp.watch(src.html, ['html'])
    };

    var notify = function(event){
        gutil.log('File', gutil.colors.yellow(event.path), 'was', gutil.colors.magenta(event.type));
    };

    for(var key in watcher) {
        watcher[key].on('change', notify);
    }

});

// 파일 중복 없애기

// gulp.task('browserSync', ['ejs', 'js', 'scss', 'css'], function () {
//
// return browserSync.init({ port : 8080, server: { baseDir: './' } });
// });
