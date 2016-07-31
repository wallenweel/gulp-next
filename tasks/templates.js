import filter from 'gulp-filter'
import pug from 'gulp-pug'

export default (gulp, c) => {
  const templates = async () => {
    const pugFilter = filter('**/*.pug', { restore: true })
    const htmlFilter = filter('**/*.html')

    return await gulp.src(c.src)
      .pipe(pugFilter)
      .pipe(pug(c.pug))
      .pipe(pugFilter.restore)

      .pipe(htmlFilter)

      .pipe(gulp.changed(c.dest))
      .pipe(gulp.dest(c.dest))
  }

  gulp.task(templates)
}
