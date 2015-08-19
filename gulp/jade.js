const gulp = require('gulp');
const jade = require('gulp-jade');
const notify = require('gulp-notify');

// Compile .jade into .html in the .tmp dir
gulp.task('jade', () => {
	return gulp.src('app/*.jade')
		.pipe(jade({ pretty: true }))
		.on('error', notify.onError(function(error) {
			return 'An error occurred while compiling jade.\nLook in the console for details.\n' + error;
		}))
		.pipe(gulp.dest('.tmp'));
});
