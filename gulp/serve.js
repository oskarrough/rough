const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');

/**
 * Development server
 */
gulp.task('serve', cb => {
	runSequence(
		['styles', 'scripts'],
		['serve:tmp', 'watch'],
		cb);
});

gulp.task('serve:tmp', cb => {
	browserSync.init({
		notify: false,
		server: {
			baseDir: ['.tmp', 'app']
		}
	});
	cb();
});

/**
 * Run tasks (that might reload the server) when these files change.
 */
gulp.task('watch', cb => {
	gulp.watch([
		'app/*.html'
	]).on('change', browserSync.reload);
	gulp.watch('app/styles/**/*.{css,scss}', ['styles']);
	gulp.watch('app/scripts/**/*.js', ['scripts']);
	cb();
});

// Export our instance of browserSync to other tasks.
module.exports = browserSync;
