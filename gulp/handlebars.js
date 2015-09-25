const gulp = require('gulp');

// Templates with handlebars-layout
const hb = require('gulp-hb');
const layouts = require('handlebars-layouts');
hb.handlebars.registerHelper(layouts(hb.handlebars));
const notify = require('gulp-notify');

gulp.task('handlebars', () => {
	return gulp.src('app/*.html')
		.pipe(hb({
			data: 'app/templates/data/**/*.{js,json}',
			helpers: 'app/templates/helpers/*.js',
			partials: 'app/templates/*.hbs',
			bustCache: true
		}))
		.on('error', notify.onError(error => `Handlebars error: ${error}`))
		.pipe(gulp.dest('.tmp'));
});
