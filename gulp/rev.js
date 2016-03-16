const gulp = require('gulp');
const RevAll = require('gulp-rev-all');

gulp.task('rev', () => {
	const revAll = new RevAll({
		dontUpdateReference: ['.html'],
		// https://github.com/smysnk/gulp-rev-all/issues/127
		dontRenameFile: [/^((?!.css$|.js$).)*$/]
	});
	return gulp.src(['.tmp/**'])
		.pipe(revAll.revision())
		.pipe(gulp.dest('dist'))
		.pipe(revAll.versionFile())
		.pipe(gulp.dest('dist'));
});
