const autoprefixer = require('autoprefixer');
const browserSync = require('./serve');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');
const postcss = require('gulp-postcss');
const atImport = require('postcss-import');

// Compiles Sass with autoprefixer and sourcemaps
const browsers = ['ie >= 10', 'ie_mob >= 10', 'ff >= 30', 'chrome >= 34', 'safari >= 7', 'opera >= 23', 'ios >= 7', 'android >= 4.4', 'bb >= 10'];

const sassOptions = {
	// Fluid grids require more than 3 decimals…
	precision: 10,
	// Also look in npm and bower
	includePaths: [
		'.',
		path.join(__dirname, '../node_modules'),
		path.join(__dirname, '../bower_components')
	]
};

gulp.task('sass', () => {
	return gulp.src('app/styles/*.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass.sync(sassOptions)
			.on('error', sass.logError))
		.pipe(postcss([
			atImport(),
			autoprefixer({browsers})
		]))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('.tmp/styles'))
		.pipe(browserSync.stream());
});
