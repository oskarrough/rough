// @todo include critical in build process?
// @todo this file is a bit (!) messy but the order of tasks is very important
// @todo consider gulp-sequence ala gulp-starter v2

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
		'app/scripts/vendor/**/*',
		'!app/*.html',
		'!app/*.jade',
	], {
		base: 'app', // keep folder structure
		dot: true // include .dotfiles
	}).pipe(gulp.dest('dist'));
});

// Build assets
gulp.task('build-assets', ['templates', 'styles', 'scripts', 'icons', 'images', 'extras'], () => {
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
