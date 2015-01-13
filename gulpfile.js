/* jshint node:true */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
	return gulp.src('app/styles/main.scss')
		.pipe($.plumber())
		.pipe($.rubySass({
			style: 'expanded',
			precision: 10,
			require: 'susy',
			bundleExec: true
		}))
		.pipe($.autoprefixer({browsers: ['last 1 version']}))
		.pipe(gulp.dest('.tmp/styles'));
});

// Lint all scripts except those inside scripts/vendor
gulp.task('jshint', function () {
	return gulp.src(['app/scripts/**/*.js', '!app/scripts/vendor/**/*.js'])
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish'))
		.pipe($.jshint.reporter('fail'));
});

// Compile .jade into .html in the .tmp dir
gulp.task('views', function () {
	return gulp.src('app/*.jade')
		.pipe($.jade({pretty: true}))
		.pipe(gulp.dest('.tmp'));
});

gulp.task('html', ['views', 'styles'], function () {
	var assets = $.useref.assets({searchPath: '{.tmp,app}'});

	return gulp.src(['app/*.html', '.tmp/*.html'])
		.pipe(assets)
		.pipe($.if('*.js', $.uglify()))
		.pipe($.if('*.css', $.csso()))
		.pipe(assets.restore())
		.pipe($.useref())
		// .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
		.pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
	return gulp.src('app/images/**/*')
		.pipe($.cache($.imagemin({
			progressive: true,
			interlaced: true
		})))
		.pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
	return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
		.pipe($.filter('**/*.{eot,svg,ttf,woff}'))
		.pipe($.flatten())
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', function () {
	return gulp.src([
		'app/*.*',
		'!app/*.html',
		'!app/*.jade',
		'node_modules/apache-server-configs/dist/.htaccess'
	], {
		dot: true
	}).pipe(gulp.dest('dist'));
});

// Copy the grunticon-generated 'icons' folder to dist
gulp.task('icons', function () {
	return gulp.src(['.tmp/images/icons/**/*'])
		.pipe(gulp.dest('dist/images/icons'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('connect', ['views', 'styles'], function () {
	var serveStatic = require('serve-static');
	var serveIndex = require('serve-index');
	var app = require('connect')()
		.use(require('connect-livereload')({port: 35729}))
		.use(serveStatic('.tmp'))
		.use(serveStatic('app'))
		// paths to bower_components should be relative to the current file
		// e.g. in app/index.html you should use ../bower_components
		.use('/bower_components', serveStatic('bower_components'))
		.use(serveIndex('app'));

	require('http').createServer(app)
		.listen(9000)
		.on('listening', function () {
			console.log('Started connect web server on http://localhost:9000');
		});
});

gulp.task('serve', ['connect', 'watch'], function () {
	require('opn')('http://localhost:9000');
});

// inject bower components
gulp.task('wiredep', function () {
	var wiredep = require('wiredep').stream;

	gulp.src('app/styles/*.scss')
		.pipe(wiredep())
		.pipe(gulp.dest('app/styles'));

	gulp.src('app/templates/layout.jade')
		.pipe(wiredep())
		.pipe(gulp.dest('app/templates'));
});

gulp.task('watch', ['connect'], function () {
	$.livereload.listen();

	// watch for changes
	gulp.watch([
		'app/*.html',
		'.tmp/*.html',
		'.tmp/styles/**/*.css',
		'app/scripts/**/*.js',
		'app/images/**/*'
	]).on('change', $.livereload.changed);

	// Run these tasks when these files change
	gulp.watch('app/**/*.jade', ['views']);
	gulp.watch('app/styles/**/*.scss', ['styles']);
	gulp.watch('bower.json', ['wiredep']);
});

gulp.task('build', ['jshint', 'html', 'images', 'fonts', 'extras', 'icons'], function () {
	return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
	gulp.start('build');
});
