const gulp = require('gulp');
const browserSync = require('browser-sync').create();

// Export our instance of browserSync for other tasks
module.exports = browserSync;

// Development server
gulp.task('serve', ['templates', 'styles', 'scripts', 'icons'], () => {
	browserSync.init({
		notify: false,
		port: 9000,
		server: {
			baseDir: ['.tmp', 'app'],
			routes: {
				'/bower_components': 'bower_components'
			}
		}
	});

	gulp.watch([
		'app/*.html',
		'app/images/**/*',
	]).on('change', browserSync.reload);

	gulp.watch('app/**/*.jade', ['jade']);
	gulp.watch('app/styles/**/*.scss', ['styles']);
	gulp.watch('app/scripts/**/*.js', ['scripts']);
	gulp.watch('app/images/icons/*.{svg,png}', ['icons']);
});

// Dist server (test your build)
gulp.task('serve:dist', () => {
	browserSync.init({
		notify: false,
		port: 9000,
		server: {
			baseDir: ['dist']
		}
	});
});

// shortcut
gulp.task('s', ['serve']);
