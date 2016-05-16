/*
	Instead of one giant gulpfile, we have one file per task inside
	the gulp folder.

	All tasks are required automatically here. For instance, when you run
	`gulp` it'll run the task defined in `gulp/default.js`
*/

const gulp = require('gulp');
const requireDir = require('require-dir');
const del = require('del');

// Require all tasks in gulp
requireDir('./gulp');

// Deletes the two folders containing compiled output.
gulp.task('clean', () => del(['.tmp', 'dist']));

// Alias for 'serve'
gulp.task('s', ['serve']);
