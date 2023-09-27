var gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
postcss = require("gulp-postcss");
autoprefixer = require("autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync").create();
cssbeautify = require("gulp-cssbeautify");
var beautify = require("gulp-beautify");

//_______ task for scss folder to css main style
function css(cb) {
  console.log("Command executed successfully compiling SCSS in assets.");
  gulp
    .src("Nowa/assets/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(beautify.css({ indent_size: 4 }))
    .pipe(sourcemaps.write(""))
    .pipe(gulp.dest("Nowa/assets/css"));
  cb();
}

function watch() {
  gulp
    .watch("Nowa/HTML/*.html", { events: "all" })
    .on("change", browserSync.reload);
  gulp
    .watch("Nowa/assets/scss/**/*.scss", { events: "all" }, css)
    .on("change", browserSync.reload);
  gulp
    .watch("Nowa/assets/js/**/*.js", { events: "all" })
    .on("change", browserSync.reload);
}

function serve(cb) {
  browserSync.init({
    server: {
      baseDir: "Nowa",
      index: "HTML/comprar-pagamento.html",
    },
  });
  console.log("serve processed");
  cb();
}

exports.default = gulp.series(serve, watch);

//_______task for style-dark
gulp.task("dark", function () {
  return gulp
    .src("Nowa/assets/css/style-dark.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(beautify.css({ indent_size: 4 }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("Nowa/assets/css"));
});

//_______task for style-transparent
gulp.task("transparent", function () {
  return gulp
    .src("Nowa/assets/css/style-transparent.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(beautify.css({ indent_size: 4 }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("Nowa/assets/css"));
});

//_______task for skinmodes
gulp.task("skin", function () {
  return gulp
    .src("Nowa/assets/css/skin-modes.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(beautify.css({ indent_size: 4 }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("Nowa/assets/css"));
});
