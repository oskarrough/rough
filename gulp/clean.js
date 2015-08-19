const gulp = require('gulp');
import del from 'del';

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));
