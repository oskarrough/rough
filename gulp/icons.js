// Run grunticon through gulp.
// - https://github.com/filamentgroup/gulpicon
// - https://gist.github.com/dcalhoun/e79ad10d518612d70721

const gulp = require('gulp');
const Grunticon = require('grunticon-lib');
const q = require('q');
const path = require('path');
const fs = require('fs');

gulp.task('icons', () => {
	const deferred = q.defer();
	const iconDir = 'app/images/icons/';
	const options = { enhanceSVG: true };
	const files = fs.readdirSync(iconDir).map(fileName => path.join(iconDir, fileName));
	const grunticon = new Grunticon(files, '.tmp/images/icons', options);

	grunticon.process(() => {
		deferred.resolve();
	});

	return deferred.promise;
});
