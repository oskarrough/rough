const gulp = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');

gulp.task('images', ['images:optimize', 'images:favicons']);

// Optimize all images (except icons and favicons, which are handled by other tasks)
gulp.task('images:optimize', () => {
	return gulp.src(['app/images/**/*', '!app/images/icons/**/*', '!app/images/favicons/**/*'])
		.pipe(changed('dist/images'))
		.pipe(imagemin([
			imagemin.svgo({plugins: [{cleanupIDs: false}]})
		]))
		.pipe(gulp.dest('dist/images'));
});

// Move favicons to the root because that's where browsers expect them to be,
// and we don't want to pollute our list of files with one million favicons
gulp.task('images:favicons', () => {
	return gulp.src('app/images/favicons/**/*')
		.pipe(changed('dist'))
		.pipe(gulp.dest('dist'));
});
