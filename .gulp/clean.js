const gulp = require('gulp');
const del = require('del');

// Deletes the two folders containing compiled output.
gulp.task('clean', () => del(['.tmp', 'dist']));
