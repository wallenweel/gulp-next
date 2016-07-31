import babel from 'gulp-babel'

export default (gulp, c) => {
  const scripts = async () =>
    await gulp.src(c.src)
      .pipe(babel())
      .pipe(gulp.dest(c.dest))

  gulp.task(scripts)
}
