var gulp = require('gulp');
var gulpFilter = require('gulp-filter');

var react = require('gulp-react');
var mocha = require('gulp-mocha');

var paths = {
    src: './src',
    target: './target'
};

gulp.task('test', function () {
    var libsFilter = gulpFilter('!**/libs/**/*');
    var mochaFilter = gulpFilter('test/mocha/**/*.js');

    gulp.src(paths.src + '/**/*.js')

        // transform jsx to js
        .pipe(libsFilter)
        .pipe(react())
        .pipe(libsFilter.restore())

        // copy into target
        .pipe(gulp.dest(paths.target))

        // run mocha
        .pipe(mochaFilter)
        .pipe(mocha({}))
        .on('error', console.warn.bind(console));
});

gulp.task('watch', function() {
    gulp.watch([
        paths.src + '/main/app/**/*.js',
        paths.src + '/test/**/*.js',
    ], ['test', 'js']);
});

gulp.task('default', ['test', 'watch']);
