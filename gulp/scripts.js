const gulp = require('gulp');
const notify = require('gulp-notify');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
// const watchify = require('watchify');

// abstraction (if we ever need antyhing else than browserify)
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
		.pipe(gulp.dest('.tmp/scripts'));
});
