const gulp = require('gulp');
const shell = require('gulp-shell');

// Runs grunticon directly from grunt
// @todo find a standalone grunticon tool
gulp.task('icons', shell.task([
	'grunt grunticon'
]));
