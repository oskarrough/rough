const gulp = require('gulp');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const babelify = require('babelify');
const rollupify = require('rollupify');
const browserSync = require('./serve');
const browserifyShim = require('browserify-shim');
const notify = require('gulp-notify');

// Runs browserify with transforms on our scripts
gulp.task('browserify', () => {
	return browserify('app/scripts/index.js', {debug: true})
		.transform(rollupify)
		.transform(babelify)
		.transform(browserifyShim)
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
