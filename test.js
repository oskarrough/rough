import test from 'ava';
import fs from 'fs';
import gulp from 'gulp';
import glob from 'glob';
require('./gulpfile');
const spawnSync = require('child_process').spawnSync;

test('we have the required structure', t => {
	t.true(fs.lstatSync('app').isDirectory());
	t.true(fs.lstatSync('gulp').isDirectory());
	t.true(fs.lstatSync('gulpfile.js').isFile());
	t.true(fs.lstatSync('package.json').isFile());
});

test('we have gulp tasks', t => {
	t.ok(gulp.tasks.build);
	t.ok(gulp.tasks.browserify);
	t.ok(gulp.tasks.clean);
	t.ok(gulp.tasks.default);
	t.ok(gulp.tasks.handlebars);
	t.ok(gulp.tasks.sass);
	t.ok(gulp.tasks.scripts);
	t.ok(gulp.tasks.serve);
	t.ok(gulp.tasks.styles);
	t.ok(gulp.tasks.templates);
});

test('it builds', async t => {
	const value = await spawnSync('gulp', ['build']);
	t.ok(value.status === 0);
});

test.cb('it really builds', t => {
	t.plan(3);
	glob('dist/*.html', (err, files) => {
		t.ok(err === null && fs.lstatSync(files[0]).isFile());
	});
	glob('dist/styles/*.css', (err, files) => {
		t.ok(err === null && fs.lstatSync(files[0]).isFile());
	});
	glob('dist/scripts/*.js', (err, files) => {
		t.ok(err === null && fs.lstatSync(files[0]).isFile());
		t.end();
	});
});
