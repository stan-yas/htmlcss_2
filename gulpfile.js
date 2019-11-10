"use strict";

const gulp = require("gulp");
const less = require("gulp-less");
const gulp_imagemin = require("gulp-imagemin");
const imagemin = require("imagemin");
const webp = require("imagemin-webp");
// const plumber = require("gulp-plumber");
// const postcss = require("gulp-postcss");
// const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();

function min_images() {
  return gulp.src("./img/*")
    .pipe(gulp_imagemin())
    .pipe(gulp.dest("./img"));
}

function min_webp() {
  return (async () => {
    const files = await imagemin(["./img/*.jpg"], {
      destination: "./img",
      plugins: [
        webp({
          quality: 65 // Quality setting from 0 to 100
          /*lossless: true // Losslessly encode images*/
        })
      ]
    });
    for (let i = 0; i < files.length; i++){
      console.log(files[i].destinationPath);
    }
  })();
}

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
exports.imagemin = min_images;
exports.webp = min_webp;
