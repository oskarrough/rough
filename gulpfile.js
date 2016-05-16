/*
	Use these three commands:

	- `npm start`
	- `npm run build`
	- `npm test`
*/

const gulp = require('gulp');
const requireDir = require('require-dir');
const del = require('del');

// Require all tasks in gulp
requireDir('.gulp');

// Cleans up compiled output
gulp.task('clean', () => del(['.tmp', 'dist']));
gulp.task('clean:tmp', () => del(['.tmp']));

// Alias for 'serve'
// npm start
gulp.task('default', ['serve']);
gulp.task('s', ['serve']);
