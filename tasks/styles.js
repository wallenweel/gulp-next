import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'

export default (gulp, c) => {
  const styles = async () =>
    await gulp.src(c.src)
      .pipe(sass(c.sass)).on('error', sass.logError)
      .pipe(autoprefixer(c.autoprefixer))
      .pipe(gulp.changed(c.dest))
      .pipe(gulp.dest(c.dest))

  gulp.task(styles)
}
