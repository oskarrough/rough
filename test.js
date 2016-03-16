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

// test('styles compile', async t => {
// 	const value = await spawnSync('gulp', ['styles']);
// 	t.ok(value.status === 0);
// 	t.true(fs.lstatSync('.tmp/styles/main.css').isFile());
// });

// test('scripts compile', async t => {
// 	const value = await spawnSync('gulp', ['scripts']);
// 	t.ok(value.status === 0); t.true(fs.lstatSync('.tmp/scripts/bundle.js').isFile());
// });

// test('templates compile', async t => {
// 	const value = await spawnSync('gulp', ['templates']);
// 	t.ok(value.status === 0);
// 	t.true(fs.lstatSync('.tmp/index.html').isFile());
// });

test('it builds', async t => {
	const value = await spawnSync('gulp', ['build']);
	t.ok(value.status === 0);
	t.true(fs.lstatSync('dist/index.html').isFile());
	glob('dist/styles/*.css', (err, files) => {
		t.true(fs.lstatSync(files[0]).isFile());
	});
	glob('dist/scripts/*.js', (err, files) => {
		t.true(fs.lstatSync(files[0]).isFile());
	});
});
