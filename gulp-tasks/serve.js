const gulp  = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dest"
        }
    });
  
    gulp.watch("dest/*.*").on('change', browserSync.reload);
});
gulp.task('browser-sync-reload', function() {
    browserSync.reload();
});
gulp.task('watch', function() {

  
    gulp.watch("songs/*.*").on('change', gulp.series('songs','browser-sync-reload'));
    gulp.watch("templates/*.*").on('change', gulp.series('songs','browser-sync-reload'));
    gulp.watch("static/*.*").on('change', gulp.series('static','browser-sync-reload'));
    gulp.watch("audios/*").on('change', gulp.series('audios','browser-sync-reload'));
});


exports.default = gulp.task('serve',gulp.parallel('build','browser-sync','watch'));