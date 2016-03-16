const gulp = require('gulp');
const RevAll = require('gulp-rev-all');
// const revNapkin = require('gulp-rev-napkin');

gulp.task('rev', () => {
	const revAll = new RevAll({
		dontUpdateReference: ['.html'],
		// https://github.com/smysnk/gulp-rev-all/issues/127
		dontRenameFile: [/^((?!.css$|.js$).)*$/]
	});
	return gulp.src(['.tmp/**'])
		.pipe(revAll.revision())
		.pipe(gulp.dest('dist'))
		// .pipe(revNapkin()) // Clean up original files.
		.pipe(revAll.versionFile())
		.pipe(gulp.dest('dist'))
		.pipe(revAll.manifestFile())
		.pipe(gulp.dest('dist'));
});
