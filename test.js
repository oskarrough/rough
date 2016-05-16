import fs from 'fs';
import test from 'ava';
import gulp from 'gulp';
import glob from 'glob';
import './gulpfile';

test('we have the required structure', t => {
	t.true(fs.lstatSync('.gulp').isDirectory());
	t.true(fs.lstatSync('src').isDirectory());
	t.true(fs.lstatSync('gulpfile.js').isFile());
	t.true(fs.lstatSync('package.json').isFile());
});

test('we have the basic gulp tasks', t => {
	const tasks = ['build', 'clean', 'styles', 'scripts', 'serve'];
	t.plan(tasks.length);
	for (let i = 0; i < tasks.length; i++) {
		t.truthy(gulp.tasks[tasks[i]]);
	}
});

// Expects that you've run `npm run build` earlier.
test('it builds and compiles', async t => {
	t.plan(3);
	const templates = await glob.sync('dist/*.html');
	t.truthy(templates.length);
	const styles = await glob.sync('dist/styles/*.css');
	t.truthy(styles.length);
	const scripts = await glob.sync('dist/scripts/*.js');
	t.truthy(scripts.length);
});
