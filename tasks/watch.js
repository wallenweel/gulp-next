export default (gulp, c, cfg) => {
  const watch = async () =>
    await c.listen.forEach(k =>
      gulp.watch(cfg[k].src, gulp.series(k))
    )
  // const tplWatcher = gulp.watch(cfg.templates.src)
  // tplWatcher.on('all', gulp.series('templates'))

  gulp.task('watch', gulp.series('build', watch))
}
