import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import $if from 'gulp-if'

export default (gulp, c, cfg) => {
  const scripts = async () =>
    await gulp.src(c.src, { base: c.cwd })
      .pipe(babel())

      .pipe($if(cfg.env.prod, uglify()))
      .pipe($if(cfg.env.prod, rename({
        suffix: '.min',
      })))

      .pipe(gulp.changed(c.dest))
      .pipe(gulp.dest(c.dest))

  gulp.task(scripts)
}
