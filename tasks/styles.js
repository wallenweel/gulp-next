import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import cssnano from 'gulp-cssnano'
import rename from 'gulp-rename'
import $if from 'gulp-if'

export default (gulp, c, cfg) => {
  const styles = async () =>
    await gulp.src(c.src, { base: c.cwd })
      .pipe(sass(c.sass)).on('error', sass.logError)

      .pipe(autoprefixer(c.autoprefixer))

      .pipe($if(cfg.env.prod, cssnano()))
      .pipe($if(cfg.env.prod, rename({
        suffix: '.min',
      })))

      .pipe(gulp.changed(c.dest))
      .pipe(gulp.dest(c.dest))

  gulp.task(styles)
}
