// Warning, currently we have to include grunticon-lib before gulp-hb
// for some dependency problem issue. This is why the file is called
// grunticon and not icons (alphabetical order).

// Icons with grunticon (https://gist.github.com/dcalhoun/e79ad10d518612d70721)
const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const Grunticon = require('grunticon-lib');
const q = require('q');

gulp.task('icons', () => {
	const deferred = q.defer();
	const inputDir = 'app/images/icons/';
	const outputDir = '.tmp/images/icons/';
	const options = {enhanceSVG: true};

	fs.lstat(inputDir, (err, stats) => {
		if (!err && stats.isDirectory()) {
			// the inputdir exists
			const files = fs.readdirSync(inputDir).map(fileName => path.join(inputDir, fileName));
			const grunticon = new Grunticon(files, outputDir, options);
			grunticon.process(() => {
				deferred.resolve();
			});
		} else {
			console.log(`No icons to compile, that's ok.`);
			deferred.resolve();
		}
	});

	return deferred.promise;
});
