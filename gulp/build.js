const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const htmlmin = require('gulp-htmlmin');

gulp.task('copy-from-app', () => {
	return gulp.src([
		'app/*.*',
		'app/fonts/**/*',
		'app/scripts/vendor/**/*',
		'!app/*.html'
	], {
		// Because we copy multiple dirs we have to:
		// 1. keep folder structure
		base: 'app',
		// 2. include .dotfiles
		dot: true
	}).pipe(gulp.dest('dist'));
});

gulp.task('copy-from-tmp', () => {
	return gulp.src(['.tmp/**/*'])
		.pipe(gulp.dest('dist'));
});

gulp.task('minify-templates', () => {
	return gulp.src('dist/**/*.html', {base: 'dist'})
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist'));
});

gulp.task('minify-styles', () => {
	return gulp.src('dist/styles/*.css', {base: 'dist'})
		// Don't remove vendor-prefixes.
		.pipe(cssnano({autoprefixer: false}))
		.pipe(gulp.dest('dist'));
});

gulp.task('minify-scripts', () => {
	return gulp.src('dist/scripts/*.js', {base: 'dist'})
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});
