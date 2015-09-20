const gulp = require('gulp');
const hb = require('gulp-hb');
const layouts = require('handlebars-layouts');
hb.handlebars.registerHelper(layouts(hb.handlebars));
const notify = require('gulp-notify');

// Compiles handlebars (file extension doesn't matter) into HTML with handlebars-layouts enabled

gulp.task('handlebars', () => {
	return gulp.src('./app/*.{html,hbs}')
		.pipe(hb({
			data: './app/templates/data/**/*.{js,json}',
			helpers: './app/templates/helpers/*.js',
			partials: './app/templates/*.hbs',
			bustCache: true
		}))
		.on('error', notify.onError(error => `Handlebars error: ${error}`))
		.pipe(gulp.dest('.tmp'));
});
