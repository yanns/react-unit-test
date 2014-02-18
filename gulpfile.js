var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var gulpFilter = require('gulp-filter');
var pkg = require('./package.json');
var changed = require('gulp-changed');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');

var react = require('gulp-react');
var mocha = require('gulp-mocha');

var paths = {
    src: './src',
    dest: './public',
    target: './target'
};

gulp.task('scripts', function() {

    // package our application
    gulp.src([paths.src + '/main/app/main.js'])
        .pipe(browserify({
            debug: gutil.env.type !== 'production',
            transform: ['reactify']
        }))
        .on('prebundle', function(bundle) {
            // do not concat react in our javascript, let it external
            // it means that the react javascript must be included in the html
            // with the same version as the react dependency in package.json
            bundle.external('react:');
        })
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(concat(pkg.name + '.min.js'))
        .pipe(gulp.dest(paths.dest));

    // copy libs (react...)
    gulp.src([paths.src + '/main/libs/*'])
        .pipe(changed(paths.dest))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('test', function () {
    // in test, do not use browserify as we already defined node modules
    var libsFilter = gulpFilter('!**/libs/**/*');
    var mochaFilter = gulpFilter('test/mocha/**/*.js');

    gulp.src([paths.src + '/**/*.js'])

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
    gulp.watch(paths.src + '/**/*.js', ['test', 'scripts']);
});

gulp.task('default', ['scripts', 'test', 'watch']);
