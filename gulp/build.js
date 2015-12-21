import gulp from 'gulp';
import uglify from 'gulp-uglify';
import minifyCss from 'gulp-minify-css';
import minifyHtml from 'gulp-minify-html';

gulp.task('copy-from-app', () => {
	return gulp.src([
		'app/*.*',
		'app/fonts/**/*',
		'app/scripts/vendor/**/*',
		'!app/*.html'
	], {
		// Because we copy multiple dirs we have to:
		// 1. keep folder structure
		base: 'app',
		// 2. include .dotfiles
		dot: true
	}).pipe(gulp.dest('dist'));
});

gulp.task('copy-from-tmp', () => {
	return gulp.src(['.tmp/**/*'])
		.pipe(gulp.dest('dist'));
});

gulp.task('minify-templates', () => {
	return gulp.src('dist/**/*.html', {base: 'dist'})
		.pipe(minifyHtml({conditionals: true, empty: true, loose: true, spare: true}))
		.pipe(gulp.dest('dist'));
});

gulp.task('minify-styles', () => {
	return gulp.src('dist/styles/*.css', {base: 'dist'})
		.pipe(minifyCss({compatibility: '*'}))
		.pipe(gulp.dest('dist'));
});

gulp.task('minify-scripts', () => {
	return gulp.src('dist/scripts/*.js', {base: 'dist'})
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});
