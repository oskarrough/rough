const gulp = require('gulp');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const babelify = require('babelify');
const rollupify = require('rollupify');
const browserSync = require('./serve');
const errorHandler = require('./error-handler');

// Runs browserify with transforms on our scripts
gulp.task('scripts', () => {
	return browserify('src/scripts/index.js', {debug: true})
		.transform(rollupify)
		.transform(babelify)
		.bundle()
		.on('error', errorHandler)
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('.tmp/scripts'))
		.pipe(browserSync.stream({once: true}));
});
