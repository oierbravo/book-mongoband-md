const gulp  = require('gulp');
//const sass = require('gulp-sass');
//import autoprefixer from 'gulp-autoprefixer';
//import sourcemaps from 'gulp-sourcemaps';

//var fm = require('front-matter');
//var path = require('path');

//const data = require('gulp-data');
//const Twig = require('twig');

const dirs = {
  src: 'src',
  dest: 'build'
};

//const sassPaths = {
//  src: `${dirs.src}/app.scss`,
//  dest: `${dirs.dest}/styles/`
//};

const songs = require('./gulp-tasks/songs.js');
const audios = require('./gulp-tasks/audios.js');
const build = require('./gulp-tasks/build.js');
const serve = require('./gulp-tasks/serve.js');
/*gulp.task('styles', () => {
  return gulp.src(paths.src)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', plugins.sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dest));
});
*/
function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = build