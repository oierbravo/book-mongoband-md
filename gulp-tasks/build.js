const gulp  = require('gulp');


gulp.task('static',function(){
    return gulp.src('static/*')
        .pipe(gulp.dest('dest/'))
});
gulp.task('clean',function(){
    return gulp.src('dest/', {read: false})
    .pipe(clean());
});
exports.default = gulp.task('build',gulp.series('songs','static','audios'));