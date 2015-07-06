import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import critical from 'critical';
import {stream as wiredep} from 'wiredep';

const $ = gulpLoadPlugins();
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

gulp.task('styles', () => {
	return gulp.src('app/styles/*.scss')
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
		.pipe($.sass.sync({
			outputStyle: 'expanded',
			precision: 10,
			includePaths: ['.']
		}).on('error', $.sass.logError))
		.pipe($.autoprefixer({browsers: ['last 2 version', 'android 4', 'ios 7', 'ie 10'] }))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest('.tmp/styles'))
		.pipe(browserSync.stream({match: '**/*.css'}));
});

function lint(files) {
	return () => {
		return gulp.src(files)
			.pipe(reload({stream: true, once: true}))
			.pipe($.eslint())
			.pipe($.eslint.format())
			.pipe($.if(!browserSync.active, $.eslint.failAfterError()));
	};
}

gulp.task('lint', lint(['app/scripts/**/*.js', '!app/scripts/vendor/**/*.js']));
gulp.task('lint:test', lint('test/spec/**/*.js'));

// Enable ES6+7 features with babel
// gulp.task('scripts', () => {
// 	return gulp.src(['app/scripts/**/*.js', '!app/scripts/vendor/**/*.js'])
// 		.pipe($.sourcemaps.init())
// 		.pipe($.babel())
// 		.pipe($.concat('main.js'))
// 		.pipe(gulp.dest('.tmp/scripts'))
// 		.pipe($.sourcemaps.write('.'))
// 		.pipe(browserSync.stream({ match: '**/*.js' }));
// });

// Compile .jade into .html in the .tmp dir
gulp.task('jade', () => {
	return gulp.src('app/*.jade')
		.pipe($.jade({ pretty: true }))
		.on('error', $.notify.onError(function(error) {
			return 'An error occurred while compiling jade.\nLook in the console for details.\n' + error;
		}))
		.pipe(gulp.dest('.tmp'));
});

gulp.task('html', ['jade', 'styles'/*, 'scripts'*/], () => {
	const assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

	return gulp.src('.tmp/*.html')
		.pipe(assets)
		.pipe($.rev())
		.pipe(assets.restore())
		.pipe($.useref())
		.pipe($.revReplace())
		.pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
	return gulp.src(['app/images/**/*', '!app/images/icons/**/*'])
		.pipe($.if($.if.isFile, $.cache($.imagemin({
			progressive: true,
			interlaced: true,
			// don't remove IDs from SVGs, they are often used
			// as hooks for embedding and styling
			svgoPlugins: [{ cleanupIDs: false }]
		}))
		.on('error', (err) => {
			console.log(err);
			this.end();
		})))
		.pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
	return gulp.src(require('main-bower-files')({
		filter: '**/*.{eot,svg,ttf,woff,woff2}'
	}).concat('app/fonts/**/*'))
		.pipe(gulp.dest('.tmp/fonts'))
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
	return gulp.src([
		'app/*.*',
		'!app/*.html',
		'!app/*.jade',
	], {
		dot: true, // include .dotfiles
		read: false // performance: no need to read files here
	}).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('copy-icons', () => {
	return gulp.src(['.tmp/images/icons/**/*'])
		.pipe(gulp.dest('dist/images/icons'));
});

// Runs grunticon directly from grunt
gulp.task('icons', $.shell.task([
	'grunt grunticon'
]));

gulp.task('s', ['serve']);
gulp.task('serve', ['jade', 'styles', 'fonts', 'icons'], () => {
	browserSync.init({
		notify: false,
		port: 9000,
		server: {
			baseDir: ['.tmp', 'app'],
			routes: {
				'/bower_components': 'bower_components'
			}
		}
	});

	gulp.watch([
		'app/*.html',
		'app/images/**/*',
		'app/scripts/**/*', // disable this line if you're using the 'scripts' task
		'.tmp/fonts/**/*'
	]).on('change', browserSync.reload);

	gulp.watch('app/**/*.jade', ['jade', browserSync.reload]);
	// gulp.watch('app/scripts/**/*.js', ['scripts']);
	gulp.watch('app/styles/**/*.scss', ['styles']);
	gulp.watch('app/images/icons/*.{svg,png}', ['icons', browserSync.reload]);
	gulp.watch('app/fonts/**/*', ['fonts']);
});

// use this to test after you build the project
gulp.task('serve:dist', () => {
	browserSync.init({
		notify: false,
		port: 9000,
		server: {
			baseDir: ['dist']
		}
	});
});

// 1. Start of the build process
gulp.task('build', ['clean', 'lint'], () => {
	gulp.start('build-assets');
});

gulp.task('build-assets', ['icons', 'html', 'images', 'fonts', 'extras'], () => {
	gulp.start('after-build');
});

gulp.task('after-build', ['copy-icons', 'minify'], () => {
	return gulp.src('dist/**/*').pipe($.size({ title: 'build', gzip: true }));
});

gulp.task('minify', () => {
	return gulp.src(['dist/scripts/*.js', 'dist/styles/*.css'], { base: 'dist' })
		.pipe($.if('*.js', $.uglify()))
		.pipe($.if('*.css', $.minifyCss({ compatibility: '*' })))
		.pipe(gulp.dest('dist'));
});

// Extracts the necessary CSS to render the specified viewport,
// inlines it in the header and loads the rest of the CSS async.
// Run this after building.
gulp.task('critical', () => {
	critical.generateInline({
		base: 'dist/',
		src: 'index.html',
		htmlTarget: 'index.html',
		width: 1300,
		height: 900
	});
});

gulp.task('default', () => {
	gulp.start('build');
});
