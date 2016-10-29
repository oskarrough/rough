import fs from 'fs';
import test from 'ava';
import glob from 'glob';
import gulpTasks from './gulpfile';

test('we have the required structure', t => {
	t.true(fs.lstatSync('.gulp').isDirectory());
	t.true(fs.lstatSync('app').isDirectory());
	t.true(fs.lstatSync('gulpfile.js').isFile());
	t.true(fs.lstatSync('package.json').isFile());
});

test('we have gulp tasks', t => {
	const tasks = ['build', 'browserify', 'clean', 'default', 'handlebars', 'sass', 'scripts', 'serve', 'styles', 'templates', 'watch', 'icons', 'minify-styles', 'minify-scripts', 'minify-templates', 'images', 'rev'];
	t.plan(tasks.length);
	for (let i = 0; i < tasks.length; i++) {
		t.truthy(gulpTasks[tasks[i]]);
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
