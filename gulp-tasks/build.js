const gulp  = require('gulp');
var clean = require('gulp-clean');

gulp.task('static',function(){
    return gulp.src('static/*')
        .pipe(gulp.dest('dest/'))
});
gulp.task('pwa',function(){
    return gulp.src('dest/icons/manifest.*')
        .pipe(gulp.dest('dest/'))
});
gulp.task('clean',function(){
    return gulp.src('dest/', {read: false})
    .pipe(clean());
});
exports.default = gulp.task('build',gulp.series('songs','static','audios','favicon'));