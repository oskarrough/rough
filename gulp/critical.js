const gulp = require('gulp');
const critical = require('critical').stream;

// Generate & inline critical-path CSS
gulp.task('critical', () => {
	return gulp.src('dist/*.html')
		.pipe(critical({
			base: 'dist/',
			inline: true
		}))
		.pipe(gulp.dest('dist'));
});
