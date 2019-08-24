const gulp  = require('gulp');
const path = require('path');
const fs = require('fs');
const through2 = require('through2');

var remark = require('gulp-remark')
var html = require('remark-html');
var lint = require('remark-preset-lint-markdown-style-guide');
const gulpGrayMatter = require('gulp-gray-matter');
const sectionize = require('remark-sectionize');
var slug = require('remark-slug');
var normalizeHeadings = require('remark-normalize-headings');

var Twig = require('gulp-twig');
var inject = require('gulp-inject-string');
var rename = require("gulp-rename");
var clean = require('gulp-clean');

var glob = require("glob");
var Data = require('gulp-data');

var cheerio = require('gulp-cheerio');

const remarkPluginTriki  = require('./remark/triki.js');
const remarkPluginChords  = require('./remark/chords.js');
const remarkPluginSongLinks = require('./remark/song-links.js');

function songs(cb) {
    return gulp.src('songs/**/*.md')
  
    .pipe(gulpGrayMatter({}))
    .pipe( remark()
        .use(remarkPluginTriki)
        .use(remarkPluginChords)
        .use(remarkPluginSongLinks)
        .use(sectionize)
        .use(normalizeHeadings)
        .use(lint)
        .use(slug)
        .use(html)
    )
    .pipe(cheerio(function ($, file) {
        // Each file will be run through cheerio and each corresponding `$` will be passed here.
        // `file` is the gulp file object
        // Make all h1 tags uppercase
        var h1Id  = $('h1').attr('id');
        $('h1').parent().addClass('container');
        $('section h2').each(function () {
          var section = $(this);
          var h2Id = $(this).attr('id');
          //$(this).attr('id','');
          section.parent().addClass('part part-' + h2Id);
        });    
      }))
    .pipe(inject.wrap('{% block page %}','{% endblock %}'))
    .pipe(inject.append('{% extends "layout.twig" %}'))
    .pipe(rename({extname: ".twig"}))
    .pipe(gulp.dest('./tmp/songs'));
}
function songsPages(cb) {
    return gulp.src('tmp/songs/*.twig')
    .pipe(Twig({
          
        base:'templates',
    }))
    .on('error', function (err) {
        process.stderr.write(err.message + '\n');
        this.emit('end');
    })
  .pipe(rename(function(data){

        data.dirname = data.basename;
        data.basename = 'index';
        return data;
  }))
 
    .pipe(gulp.dest('./dest/songs'));
}
function songsData(cb){
    
    return gulp.src('songs/**/*.md')
        .pipe(gulpGrayMatter({ /* options */ }))
        
        .pipe(through2.obj(function(file, _, cb) {
            if (file.isBuffer()) {
                let song = {
                    id: path.basename(file.path,'.md'),

                  };
                  const data = Object.assign(song, file.data);
                  file.contents = Buffer.from(JSON.stringify(data));
            }
            cb(null, file);
            }))
            .pipe(rename({extname: ".json"}))
            .pipe(gulp.dest('./tmp/songs'));
}
function songsIndex(cb){
  
      
    return gulp.src('templates/index.twig')
        .pipe(Data(function(file){
            let songList = [];
            let dataListFiles = glob.sync('tmp/songs/*.json')
            dataListFiles.forEach(function(file){
                let rawdata = fs.readFileSync(file);
                let song = JSON.parse(rawdata);
                songList.push(song);
            })
            return {
                songs:songList
            };
        }))
        .pipe(Data(function(){
            return {
                title: 'Mongo Book'
            }
        }))
        .pipe(Twig({
          
            base:'templates',
        }))
        .pipe(gulp.dest('./dest'));
}
function songsClean(cb){

    return gulp.src('tmp/', {read: false})
    .pipe(clean());
}

exports.songs = songs;
exports.default = gulp.task('songs',gulp.series(songs,songsPages,songsData,songsIndex,songsClean));
