import imagemin from 'gulp-imagemin'

export default (gulp, c) => {
  const images = async () =>
    await gulp.src(c.src)
      .pipe(imagemin())
      .pipe(gulp.dest(c.dest))

  gulp.task(images)
}
