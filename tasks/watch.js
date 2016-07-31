export default (gulp, c, cfg) => {
  const watch = async () =>
    await c.listen.forEach(k =>
      gulp.watch(cfg[k].src, gulp.series(k))
    )

  gulp.task('watch', gulp.series('build', watch))
}
