const gulp = require('gulp');
const jade = require('gulp-jade');

gulp.task('templates', ['jade']);

// Compile .jade into .html in the .tmp dir
// @todo reload browser AFTER jade (couldn't get it to work 100%)
gulp.task('jade', () => {
	return gulp.src('app/*.jade')
		.pipe(jade({ pretty: true }))
		.pipe(gulp.dest('.tmp'));
});
