import del from 'del'

export default (gulp, c, cfg) => {
  const clean = async () =>
    await del(['.tmp', cfg.dest('*')], { dot: true })

  gulp.task(clean)
}
