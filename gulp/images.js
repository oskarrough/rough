const gulp = require('gulp');
const gulpif = require('gulp-if');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');

// Optimize all images (but not icons, since they are handled by grunticon)
gulp.task('images', () => {
	return gulp.src(['app/images/**/*', '!app/images/icons/**/*'])

		// trick to only optimize what we need
		pipe(gulpif(gulpif.isFile, cache(imagemin({

			// progressive jpgs load nicer
			progressive: true,

			// don't remove IDs from SVGs, they are often used
			// as hooks for embedding and styling
			svgoPlugins: [{ cleanupIDs: false }]
		}))
		.on('error', (err) => {
			console.log(err);
			this.end();
		})))
		.pipe(gulp.dest('dist/images'));
});
