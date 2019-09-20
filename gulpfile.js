const gulp = require("gulp");
const less = require("gulp-less");
gulp.task("less", function() {
  return gulp.src("./barbershop/less/style.less")
    .pipe(less())
    .pipe(gulp.dest("./barbershop/css"));
});
