import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'

export default (gulp, cfg) => {
  const styles = async () =>
    await gulp.src(cfg.path.styles('*.scss'))
      .pipe(sass()).on('error', sass.logError)
      .pipe(autoprefixer())
      .pipe(gulp.dest(cfg.path.dest()))

  gulp.task(styles)
}
