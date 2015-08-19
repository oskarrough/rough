const gulp = require('gulp');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');

// 1. Start of the build process
gulp.task('build', ['clean', 'lint'], () => {
	gulp.start('build-assets');
});

// Move files not covered by other tasks to dist
gulp.task('extras', () => {
	return gulp.src([
		'app/*.*',
		'!app/*.html',
		'!app/*.jade',
	], {
		dot: true // include .dotfiles
	}).pipe(gulp.dest('dist'));
});

// Build assets
gulp.task('build-assets', ['html', 'styles', 'scripts', 'icons', 'images', 'fonts', 'extras'], () => {
	gulp.start('minify');
});

// Copies all assets (after they are built)
gulp.task('copy-assets', () => {
	return gulp.src(['.tmp/**/*'])
		.pipe(gulp.dest('dist'));
});

// After assets are built and copied, we can minify
gulp.task('minify', ['copy-assets'], () => {
	return gulp.src(['dist/scripts/*.js', 'dist/styles/*.css'], { base: 'dist' })
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCss({ compatibility: '*' })))
		.pipe(gulp.dest('dist'));
});

// @todo include critical in build process?
// @todo this file is a bit (!) messy but the order of tasks is very important
