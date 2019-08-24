const gulp  = require('gulp');

var rename = require("gulp-rename");

exports.default = gulp.task('audios', function() {
    return gulp.src('audios/**/*.mp3')
    .pipe(rename(function(data){
        data.dirname += '/audios' ;
        return data;
    }))
    .pipe(gulp.dest('dest/songs'))
});


