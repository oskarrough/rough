const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');

/**
 * Development server
 */
gulp.task('serve', cb => {
	runSequence(
		['templates', 'styles', 'scripts', 'icons'],
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
 * Starts a server from the `dist` folder, which is useful for testing `gulp build`.
 */
gulp.task('serve:dist', cb => {
	browserSync.init({
		notify: false,
		server: {
			baseDir: ['dist']
		}
	});
	cb();
});

/**
 * Run tasks (that might reload the server) when these files change.
 */
gulp.task('watch', cb => {
	gulp.watch([
		'app/images/**/*'
	]).on('change', browserSync.reload);
	gulp.watch(['app/*.html', 'app/templates/**/*.{hbs,js,json}'], ['handlebars']);
	gulp.watch('app/styles/**/*.scss', ['styles']);
	gulp.watch('app/scripts/**/*.js', ['scripts']);
	gulp.watch('app/images/icons/*.{svg,png}', ['icons']);
	cb();
});

// Export our instance of browserSync to other tasks.
module.exports = browserSync;
