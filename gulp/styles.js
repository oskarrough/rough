// const gulp = require('gulp');
// const plumber = require('gulp-plumber');
// const sourcemaps = require('gulp-sourcemaps');
// const sass = require('gulp-sass');
// const autoprefixer = require('gulp-autoprefixer');
// const browserSync = require('browser-sync');

// // abstraction (if we ever need anything else than sass)
// gulp.task('styles', ['sass']);

// gulp.task('sass', () => {
// 	return gulp.src('app/styles/*.scss')
// 		.pipe(plumber())
// 		.pipe(sourcemaps.init())
// 		.pipe(sass.sync({
// 			outputStyle: 'expanded',
// 			precision: 10,
// 			includePaths: ['.']
// 		}).on('error', sass.logError))
// 		.pipe(autoprefixer({
// 			browsers: ['last 2 version', 'android 4', 'ios 7', 'ie 10']
// 		}))
// 		.pipe(sourcemaps.write())
// 		.pipe(gulp.dest('.tmp/styles'))
// 		.pipe(browserSync.stream({ stream: true, match: '**/*.css' }));
// });
