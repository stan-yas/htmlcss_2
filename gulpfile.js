"use strict";

const gulp = require("gulp");
const less = require("gulp-less");
// const plumber = require("gulp-plumber");
// const postcss = require("gulp-postcss");
// const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();

function style(){
  return gulp.src("./less/style.less")
    // .pipe(plumber())
    .pipe(less())
    // .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("./css")); /*.pipe(server.stream()*/
}

function watch_less(){
  return gulp.watch(["./less/*.less","./less/blocks/*.less"],
    {delay: 1000}, style);
}

function serve(){
  style();
  server.init({
    server: "./"
  });
  gulp.watch(["./*.html", "./css/*.css"]).on('change',server.reload);    /*, {delay: 1000}, server.reload);*/
}

exports.style = style;
exports.watch = watch_less;
exports.watch_serve = gulp.parallel(watch_less, serve);
