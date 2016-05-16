const path = require('path');
const atImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const errorHandler = require('./error-handler');
const browserSync = require('./serve');

// Add support for more browsers than Autoprefixer does out of the box
const browsers = ['ie >= 10', 'ie_mob >= 10', 'ff >= 30', 'chrome >= 34', 'safari >= 7', 'opera >= 23', 'ios >= 7', 'android >= 4.4', 'bb >= 10'];

// Fluid grids require more than 3 decimals. Also look in npm and bower.
const sassOptions = {
	precision: 10,
	includePaths: [
		'.',
		path.join(__dirname, '../node_modules'),
		path.join(__dirname, '../bower_components')
	]
};

gulp.task('styles', () => {
	return gulp.src('src/styles/*.scss')
		.pipe(plumber({errorHandler}))
		.pipe(sourcemaps.init())
		.pipe(sass.sync(sassOptions))
		.pipe(postcss([
			atImport(),
			autoprefixer({browsers})
		]))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('.tmp/styles'))
		.pipe(browserSync.stream());
});
