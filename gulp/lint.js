const gulp = require('gulp');
const gulpif = require('gulp-if');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

function lint(files) {
	return () => {
		return gulp.src(files)
			.pipe(reload({ stream: true, once: true }))
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(gulpif(!browserSync.active, eslint.failAfterError()));
	};
}

// Lint everything but vendor files
gulp.task('lint', lint(['app/scripts/**/*.js', '!app/scripts/vendor/**/*.js']));

// gulp.task('lint:test', lint('test/spec/**/*.js'));
