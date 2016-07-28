// Templates with handlebars-layout

const gulp = require('gulp');
const hb = require('gulp-hb');
const layouts = require('handlebars-layouts');
const notify = require('gulp-notify');
const browserSync = require('./serve');

gulp.task('handlebars', () => {
	const hbStream = hb({bustCache: true})
		.helpers(layouts)
		.helpers('app/templates/helpers/**/*.js')
		.partials('app/templates/*.hbs')
		.data('app/templates/data/**/*.{js,json}');

	return gulp.src('app/*.html')
		.pipe(hbStream)
			.on('error', notify.onError(error => `Handlebars error: ${error}`))
		.pipe(gulp.dest('.tmp'))
		.pipe(browserSync.stream());
});
