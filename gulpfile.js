/*
	Instead of one giant gulpfile, we have one file per task inside
	the gulp folder.

	All tasks are required automatically here. For instance, when you run
	`gulp` it'll run the task defined in `gulp/default.js`
*/

const gulp = require('gulp');
const requireDir = require('require-dir');

// Require all tasks in gulp
requireDir('./gulp');

gulp.task('default', ['build']);
gulp.task('templates', ['handlebars']);
gulp.task('styles', ['sass']);
gulp.task('scripts', ['browserify']);
gulp.task('s', ['serve']);
