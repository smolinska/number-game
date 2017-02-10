'use strict';
const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks');
const rename = require("gulp-rename");
const browserSync = require('browser-sync');
const sass = require('gulp-sass');

function swallowError(error) {
    console.error(error.toString());
    this.emit('end')
}

const SCSS_SRC = 'css/*.scss';
gulp.task('default', ['templates', 'scss'], function () {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "./build/"
        },
        files: '*'
    });
    gulp.watch(["templates/**/*"], ['templates']);
    gulp.watch([SCSS_SRC], ['scss']);

});

gulp.task('templates', ['compile'], browserSync.reload);
gulp.task('compile', function () {
    return gulp.src('templates/index.html')
        .pipe(nunjucks.compile()).on('error', swallowError)
        .pipe(gulp.dest('build'));
});

gulp.task('scss', function () {
    return gulp.src(SCSS_SRC)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
});
