const gulp = require('gulp');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const babelify = require('babelify');
const browserifyCss = require('browserify-css');
// const watchify = require('watchify');
const browserSync = require('./serve');
const notify = require('gulp-notify');

// Runs browserify with transforms on our scripts
gulp.task('browserify', () => {
	return browserify('app/scripts/main.js', { debug: true })
		.transform(babelify)
		.transform(browserifyCss, { global: true })
		.bundle()
		.on('error', notify.onError(error => `Browserify error: ${error}`))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('.tmp/scripts'))
		.pipe(browserSync.stream({ once: true }));
});
