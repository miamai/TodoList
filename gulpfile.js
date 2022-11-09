const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// 記得更改 src / dest / watch 的檔案名稱
gulp.task('sass', function () {
  return gulp.src('sass/**/*.scss').pipe(sass()).pipe(gulp.dest('css'));
});

gulp.task('watch', function () {
  gulp.watch('sass/**/*.scss', gulp.series('sass'));
});