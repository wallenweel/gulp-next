import babel from 'gulp-babel'
import uglify from 'gulp-uglify'

export default (gulp, c, cfg) => {
  const scripts = async () =>
    await gulp.src(c.src)
      .pipe(babel())

      .pipe(gulp.if(cfg.env.prod, uglify()))
      .pipe(gulp.if(cfg.env.prod, gulp.rename({
        suffix: '.min',
      })))

      .pipe(gulp.changed(c.dest))
      .pipe(gulp.dest(c.dest))

  gulp.task(scripts)
}
