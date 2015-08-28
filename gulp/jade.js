const gulp = require('gulp');
const jade = require('gulp-jade');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

// Compiles jade into HTML
// Plumber makes sure the "pipe doesn't break" causing the server to stop
// Gulp Util logs the error (could also use notify)
// @todo reload browser AFTER jade (couldn't get it to work 100%)
gulp.task('jade', () => {
	return gulp.src(['app/*.jade'])
		.pipe(plumber())
		.pipe(jade({ pretty: true }))
		.on('error', notify.onError((error) => { return 'Jade error:' + error; }))
		.pipe(gulp.dest('.tmp'));
});
