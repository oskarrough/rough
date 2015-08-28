const gulp = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const gutil = require('gulp-util');

// Optimize all images (but not icons, since they are handled by grunticon)
gulp.task('images', () => {
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

// 1. Progressive jpgs appear to load faster
// 2. Don't remove IDs from SVGs as they are often used as hooks for embedding and styling
