const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const htmlmin = require('gulp-htmlmin');
const runSequence = require('run-sequence');

// Build everything
gulp.task('build', cb => {
	runSequence(
		'clean',
		['styles', 'scripts'],
		['copy-from-src', 'copy-from-tmp'],
		['minify-styles', 'minify-scripts', 'minify-templates'],
		'critical',
		cb);
});

// Copies files not handled by other tasks.
gulp.task('copy-from-src', () => {
	return gulp.src('src/*.*', {dot: true})
		.pipe(gulp.dest('dist'));
});

// Copies processed files.
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
		// Don't remove vendor-prefixes and 'safe' until cssnano v4 is released.
		.pipe(cssnano({safe: true, autoprefixer: false}))
		.pipe(gulp.dest('dist'));
});

gulp.task('minify-scripts', () => {
	return gulp.src('dist/scripts/*.js', {base: 'dist'})
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});
