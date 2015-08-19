const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

// abstraction (if we ever need anything else than sass)
gulp.task('styles', ['sass']);

gulp.task('sass', () => {
	return gulp.src('app/styles/*.scss')
		.pipe(plumber())
		// .pipe(sourcemaps.init())
		.pipe(sass.sync({
			outputStyle: 'expanded',
			precision: 10,
			includePaths: ['.']
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 version', 'android 4', 'ios 7', 'ie 10']
		}))
		// .pipe(sourcemaps.write())
		.pipe(gulp.dest('.tmp/styles'))
		.pipe(browserSync.stream());
});

// shortcut
gulp.task('s', ['serve']);

gulp.task('serve', ['html', 'styles', 'scripts', 'fonts', 'icons'], () => {

	// start the server
	browserSync.init({
		// notify: false,
		port: 9000,
		server: {
			baseDir: ['.tmp', 'app'],
			routes: {
				'/bower_components': 'bower_components'
			}
		}
	});

	// gulp.watch([
	// 	'app/*.html',
	// 	'app/images/**/*',
	// ]).on('change', browserSync.reload);

	// gulp.watch('app/**/*.jade', ['jade', browserSync.reload]);
	gulp.watch('app/styles/**/*.scss', ['styles']);
	// gulp.watch('app/scripts/**/*.js', ['scripts']);
	// gulp.watch('app/images/icons/*.{svg,png}', ['icons']);
});

// use this to test after you build the project
gulp.task('serve:dist', () => {
	browserSync.init({
		notify: false,
		port: 9000,
		server: {
			baseDir: ['dist']
		}
	});
});
