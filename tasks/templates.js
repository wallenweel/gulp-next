import filter from 'gulp-filter'
import pug from 'gulp-pug'

export default (gulp, cfg) => {
  const c = cfg.templates

  const pugFilter = filter('**/*.pug', { restore: true })
  const htmlFilter = filter('**/*.html')

  const templates = async () =>
    await gulp.src(c.src)
      .pipe(pugFilter)
      .pipe(pug(c.pug))
      .pipe(pugFilter.restore)
      .pipe(htmlFilter)
      .pipe(gulp.dest(c.dest))

  gulp.task(templates)
}
