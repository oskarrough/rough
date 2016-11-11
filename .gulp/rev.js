const gulp = require('gulp');
const RevAll = require('gulp-rev-all');

const revOptions = {
	dontUpdateReference: ['.html'],
	// https://github.com/smysnk/gulp-rev-all/issues/127
	dontRenameFile: [/^((?!.css$|.js$).)*$/]
};

gulp.task('rev', () => {
	return gulp.src(['.tmp/**'])
		.pipe(RevAll.revision(revOptions))
		.pipe(gulp.dest('dist'))
		.pipe(RevAll.versionFile())
		.pipe(gulp.dest('dist'));
});
