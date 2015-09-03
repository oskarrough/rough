const gulp = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const gutil = require('gulp-util');

/**
 * Move favicons to the root because that's where browsers expect them to be,
 * and we don't want to pollute our list of files with one million favicons
 */
gulp.task('favicons', () => {
	return gulp.src('app/images/favicons/**/*')
		.pipe(gulp.dest('dist'));
});

/**
 * Optimize all images (but not icons, since they are handled by grunticon)
 * 1. Progressive jpgs appear to load faster
 * 2. Don't remove IDs from SVGs as they are often used as hooks for embedding and styling
 */
gulp.task('images', ['favicons'], () => {
	return gulp.src(['app/images/**/*', '!app/images/icons/**/*'])
		.pipe(changed('dist/images'))
		.pipe(imagemin({
			progressive: true, /* 1 */
			svgoPlugins: [{ cleanupIDs: false }] /* 2 */
		}))
		.on('error', (err) => {
			gutil.log(err);
			this.end();
		})
		.pipe(gulp.dest('dist/images'));
});
