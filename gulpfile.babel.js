/*
	Instead of one giant gulpfile, we have one file per task inside
	the gulp folder.

	All tasks are required automatically here. For instance, when you run
	`gulp` it'll run the task defined in `gulp/default.js`
*/

import gulp from'gulp';
import requireDir from'require-dir';
import runSequence from 'run-sequence';

// Require all tasks in gulp
requireDir('./gulp');

gulp.task('default', ['build']);
gulp.task('templates', ['handlebars']);
gulp.task('styles', ['sass']);
gulp.task('scripts', ['browserify']);

// Development server
gulp.task('serve', cb => {
	runSequence(
		['templates', 'styles', 'scripts', 'icons'],
		['serve:dev', 'watch']
	);
	cb();
});
gulp.task('s', ['serve']);


// Build everything
gulp.task('build', cb => {
	runSequence(
		['clean',]
		['icons', 'images', 'templates', 'styles', 'scripts'],
		['copy-from-app', 'copy-from-tmp'],
		['minify-styles', 'minify-scripts', 'minify-templates'],
		['critical']
	);
	cb();
});
