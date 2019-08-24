const gulp = require("gulp");
const favicons = require("gulp-favicons");
const log = require("fancy-log");

gulp.task("favicon", function () {
  return gulp.src("app-icon.png").pipe(favicons({
    appName: "Mongo Book",
    appDescription: "App description",
    developerName: "oierbravo",
    developerURL: "https://github.com/oierbravo",
    background: "#fff",
    theme_color: "#000",
    path: "/icons/",
    url: "https://bookv2.mongoband.org",
    display: "standalone",
    orientation: "any",
    start_url: "/",
    version: 1.0,
    logging: false,
    html: "index.html",
    pipeHTML: true,
    replace: true,
  }))
    .on("error", log)
    .pipe(gulp.dest("dest/icons"));
});
