'use strict';
const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks');
const rename = require("gulp-rename");
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

function swallowError(error) {
    console.error(error.toString());
    this.emit('end')
}

const src = {
    scss: 'src/css/**/*.scss',
    js: 'src/js/**/*.js',
    templates: 'templates/index.html',
};
const out = {
    templates: 'templates/**/*',
    scss: 'build/css',
    js: 'build/js',
};


gulp.task('default', ['templates', 'scss', 'js'], () => {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "./build/"
        },
        files: '*'
    });
    gulp.watch(["templates/**/*"], ['templates']);
    gulp.watch(src.scss, ['scss']);
    gulp.watch(src.js, ['js']);

});

gulp.task('templates', ['compile'], browserSync.reload);
gulp.task('compile', () => {
    return gulp.src('src/index.html')
        .pipe(nunjucks.compile()).on('error', swallowError)
        .pipe(gulp.dest('build'));
});

gulp.task('scss', () => {
    return gulp.src(src.scss)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(out.scss))
        .pipe(browserSync.stream());
});

gulp.task('js', () => {
    return gulp.src(src.js)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(out.js));
});

