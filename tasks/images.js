import imagemin from 'gulp-imagemin'
import $if from 'gulp-if'

export default (gulp, c, cfg) => {
  const images = async () =>
    await gulp.src(c.src)
      .pipe($if(cfg.env.prod, imagemin()))

      .pipe(gulp.changed(c.dest))
      .pipe(gulp.dest(c.dest))

  gulp.task(images)
}
