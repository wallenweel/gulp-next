import del from 'del'

export default (gulp, c, cfg) => {
  const clean = async () =>
    await del(['.tmp', cfg.path.dest('*')], { dot: true })

  gulp.task(clean)
}
