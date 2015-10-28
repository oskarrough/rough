// @todo implement watchify
// https://github.com/Browsersync/recipes/tree/master/recipes/gulp.browserify

const gulp = require('gulp');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const babelify = require('babelify');
const browserifyCss = require('browserify-css');
const browserSync = require('./serve');
const browserifyShim = require('browserify-shim');
const notify = require('gulp-notify');

// const watchify = require('watchify');

// Runs browserify with transforms on our scripts
gulp.task('browserify', () => {
	return browserify('app/scripts/main.js', {debug: true})
		.transform(babelify)
		.transform(browserifyShim)
		.transform(browserifyCss, {global: true})
		.bundle()
		.on('error', notify.onError(error => `Browserify error: ${error}`))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('.tmp/scripts'))
		.pipe(browserSync.stream({once: true}));
});

// To use browserify-shim, add something like this to package.json
/*
"browserify-shim": {
  "slick-carousel": {
    "exports": null,
    "depends": "jquery:$"
 }
},
*/
