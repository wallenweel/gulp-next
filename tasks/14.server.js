import browserSync from 'browser-sync'

export default (
  { task, series },
  c
) => {
  const bsServer = async () => await browserSync(c.bs)

  task('server', series('watch', bsServer))
}
