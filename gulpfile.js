"use strict";

const gulp = require("gulp");
const less = require("gulp-less");
// const plumber = require("gulp-plumber");
// const postcss = require("gulp-postcss");
// const autoprefixer = require("autoprefixer");

function style(){
  return gulp.src("./barbershop/less/style.less")
    // .pipe(plumber())
    .pipe(less())
    // .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("./barbershop/css"));
}

function do_watch(){
  return gulp.watch(["./barbershop/less/*.less","./barbershop/less/blocks/*.less"],
    {delay: 1000}, style);
}

exports.style = style;
exports.serve = gulp.series(style, do_watch);
