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
			baseDir: ['.tmp', 'src']
		}
	});
	cb();
});

/**
 * Run tasks (that might reload the server) when these files change.
 */
gulp.task('watch', cb => {
	gulp.watch([
		'src/*.html'
	]).on('change', browserSync.reload);
	gulp.watch('src/styles/**/*.{css,scss}', ['styles']);
	gulp.watch('src/scripts/**/*.js', ['scripts']);
	cb();
});

// Export our instance of browserSync to other tasks.
module.exports = browserSync;
