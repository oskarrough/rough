import test from 'ava';

// Special modules needed for these tests.
import fs from 'fs';
import gulp from 'gulp';
import glob from 'glob';
require('./gulpfile');

test('we have the required structure', t => {
	t.true(fs.lstatSync('app').isDirectory());
	t.true(fs.lstatSync('gulp').isDirectory());
	t.true(fs.lstatSync('gulpfile.js').isFile());
	t.true(fs.lstatSync('package.json').isFile());
});

test('we have gulp tasks', t => {
	const tasks = ['build', 'browserify', 'clean', 'default', 'handlebars', 'sass', 'scripts', 'serve', 'styles', 'templates'];
	t.plan(tasks.length);
	for (let i = 0; i < tasks.length; i++) {
		t.ok(gulp.tasks[tasks[i]]);
	}
});

// Expects that you've run `npm run build` earlier.
test('it builds and compiles', async t => {
	t.plan(3);
	const templates = await glob.sync('dist/*.html');
	t.ok(templates.length);
	const styles = await glob.sync('dist/styles/*.css');
	t.ok(styles.length);
	const scripts = await glob.sync('dist/scripts/*.js');
	t.ok(scripts.length);
});
