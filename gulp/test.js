const gulp = require('gulp');
const shell = require('gulp-shell');

// Just an alias for running `npm test` (which runs xo…)
gulp.task('test', shell.task([
	'npm test'
]));
