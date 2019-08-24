const gulp  = require('gulp');


const songs = require('./gulp-tasks/songs.js');
const audios = require('./gulp-tasks/audios.js');
const favicons = require('./gulp-tasks/favicons.js');
const build = require('./gulp-tasks/build.js');
const serve = require('./gulp-tasks/serve.js');



exports.default = serve