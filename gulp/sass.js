const autoprefixer = require('autoprefixer');
const browserSync = require('./serve');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

// Compiles Sass with autoprefixer and sourcemaps
const browsers = ['last 2 versions', 'android 4', 'ios 7', 'ie 10'];

gulp.task('sass', () => {
	return gulp.src('app/styles/*.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass.sync({ precision: 10, includePaths: ['.'] })
			.on('error', sass.logError))
		.pipe(postcss([autoprefixer({ browsers })]))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('.tmp/styles'))
		.pipe(browserSync.stream());
});
