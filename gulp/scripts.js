// @todo implement watchify
// https://github.com/Browsersync/recipes/tree/master/recipes/gulp.browserify

const gulp = require('gulp');
const notify = require('gulp-notify');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const browserSync = require('./serve');
// const watchify = require('watchify');

// abstraction (don't call browserify directly)
gulp.task('scripts', ['browserify']);

// Runs browserify and babelify on our scripts
gulp.task('browserify', () => {
	return browserify('app/scripts/main.js', { debug: true })
		.transform(require('babelify'))
		.transform('browserify-css', {
			global: true
		})
		.bundle()
		.on('error', notify.onError((error) => { return 'Browserify error:' + error; }))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('.tmp/scripts'))
		.pipe(browserSync.stream({ once: true }));
});
