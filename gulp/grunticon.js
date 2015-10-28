// Warning, currently we have to include grunticon-lib before gulp-hb
// for some dependency problem issue. This is why the file is called
// grunticon and not icons (alphabetical order).

// Icons with grunticon (https://gist.github.com/dcalhoun/e79ad10d518612d70721)
const gulp = require('gulp');
const Grunticon = require('grunticon-lib');
const q = require('q');
const path = require('path');
const fs = require('fs');

gulp.task('icons', () => {
	const deferred = q.defer();
	const inputDir = 'app/images/icons/';
	const outputDir = '.tmp/images/icons/';
	const options = {enhanceSVG: true};
	const files = fs.readdirSync(inputDir).map(fileName => path.join(inputDir, fileName));
	const grunticon = new Grunticon(files, outputDir, options);

	grunticon.process(() => {
		deferred.resolve();
	});

	return deferred.promise;
});
