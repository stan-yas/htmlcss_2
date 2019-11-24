"use strict";

const gulp = require("gulp");
const less = require("gulp-less");
const gulp_imagemin = require("gulp-imagemin");
const imagemin = require("imagemin");
const imagemin_webp = require("imagemin-webp");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const autoprefixer = require("autoprefixer");
const minify = require("gulp-csso");
const svgstore = require("gulp-svgstore");
const rename = require("gulp-rename");
const server = require("browser-sync").create();
const del = require('del');

function style() {
  return gulp.src("src/less/style.less")
  // .pipe(plumber())
    .pipe(less())
    // .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("build/css")) /*.pipe(server.stream()*/
  // .pipe(minify())
  // .pipe(rename("style.min.css"))
  // .pipe(gulp.dest("build/css"))
}

function html() {
  return gulp.src("src/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
}

function min_images() { // minify image
  return gulp.src("build/img/**/*.{png,jpg,svg}")
    .pipe(gulp_imagemin([
      gulp_imagemin.optipng({optimizationLevel: 3}),
      gulp_imagemin.jpegtran({progressive: true}),
      gulp_imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
}

function sprite() { // creates SVG sprite form several SVG files
  return gulp.src("src/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("src/img"));
}

function webp() { // transforms images to WEBP format
  return (async () => {
    const files = await imagemin(["build/img/*.jpg"], {
      destination: "img",
      plugins: [
        imagemin_webp({
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

function watch_less() {
  return gulp.watch(["src/less/**/*.less"],
    {delay: 1000}, style);
}

function serve() {
  style();
  server.init({
    server: "./"
  });
  gulp.watch(["build/**/*.html", "build/css/*.css"]).on('change',server.reload);    /*, {delay: 1000}, server.reload);*/
}

function clean() {
  return del([ 'build/**/*' ]);
}

function copy() {
  return gulp.src([
    "src/**/*.html",
    "src/fonts/**/*.{woff,woff2}",
    "src/img/**",
    "src/js/**"
  ], {
    base: "src"
  })
    .pipe(gulp.dest("build"));
}

exports.serve = gulp.parallel(watch_less, serve);
exports.clean = clean;
exports.style = style;
exports.build = gulp.series(
  clean,
  style,
  copy
);
