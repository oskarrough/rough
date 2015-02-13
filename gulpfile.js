/*global -$ */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var exec = require('child_process').exec;
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Inline sourcemaps
gulp.task('styles', function() {
	// gulp-ruby-sass doesn't support "gulp.src"
	return $.rubySass('app/styles/main.scss', {
			sourcemap: true,
			precision: 10,
			require: 'susy',
			bundleExec: true
		})
		.on('error', function(err) {
			console.error('Error', err.message);
		})
		.pipe($.autoprefixer(['last 2 versions']))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest('.tmp/styles'))
		.pipe(reload({stream:true}));
});

// Lint all scripts except those inside scripts/vendor
gulp.task('jshint', function () {
	return gulp.src(['app/scripts/**/*.js', '!app/scripts/vendor/**/*.js'])
		.pipe(reload({stream: true, once: true}))
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish'))
		.pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// Compile .jade into .html in the .tmp dir
gulp.task('views', function () {
	return gulp.src('app/*.jade')
		.pipe($.jade({pretty: true}))
		.pipe(gulp.dest('.tmp'));
});

gulp.task('html', ['views', 'styles'], function () {
	var assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

	return gulp.src(['app/*.html', '.tmp/*.html'])
		.pipe(assets)
		.pipe($.if('*.js', $.uglify()))
		.pipe($.if('*.css', $.csso()))
		.pipe($.rev())
		.pipe(assets.restore())
		.pipe($.useref())
		.pipe($.revReplace())
		.pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
	return gulp.src('app/images/**/*')
		.pipe($.cache($.imagemin({
			progressive: true,
			interlaced: true,
			// don't remove IDs from SVGs, they are often used
			// as hooks for embedding and styling
			svgoPlugins: [{cleanupIDs: false}]
		})))
		.pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
	return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
		.pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
		.pipe($.flatten())
		.pipe(gulp.dest('.tmp/fonts'))
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', ['move-icons'], function () {
	return gulp.src([
		'app/*.*',
		'!app/*.html',
		'!app/*.jade',
		'node_modules/apache-server-configs/dist/.htaccess'
	], {
		dot: true
	}).pipe(gulp.dest('dist'));
});

gulp.task('move-icons', function () {
	return gulp.src(['.tmp/images/icons/**/*'])
		.pipe(gulp.dest('dist/images/icons'));
});

// Runs grunticon directly from grunt
gulp.task('icons', function (cb) {
	exec('grunt grunticon', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['views', 'styles', 'fonts', 'icons'], function () {
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: ['.tmp', 'app'],
			routes: {
				'/bower_components': 'bower_components'
			}
		}
	});

	// watch for changes
	gulp.watch([
		'app/*.html',
		'.tmp/*.html',
		// '.tmp/styles/**/*.css',
		'app/scripts/**/*.js',
		'app/images/**/*'
	]).on('change', reload);

	gulp.watch('app/**/*.jade', ['views', reload]);
	// gulp.watch('app/styles/**/*.scss', ['styles']);
	gulp.watch('app/styles/**/*.scss', ['styles']);
	gulp.watch('bower.json', ['wiredep', 'fonts', reload]);
});

// inject bower components
gulp.task('wiredep', function () {
	var wiredep = require('wiredep').stream;

	gulp.src('app/styles/*.scss')
		.pipe(wiredep({
			ignorePath: /^(\.\.\/)+/
		}))
		.pipe(gulp.dest('app/styles'));

	gulp.src('app/templates/layout.jade')
		.pipe(wiredep({
			ignorePath: /^(\.\.\/)*\.\./
		}))
		.pipe(gulp.dest('app/templates'));
});

gulp.task('build', ['jshint', 'html', 'images', 'fonts', 'extras'], function () {
	return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean', 'icons'], function () {
	gulp.start('build');
});
