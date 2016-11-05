export default (
  { task, watch, series },
  c,
  cfg
) => {
  const watchChanged = async () =>
    await c.tasks.forEach(k =>
      watch(cfg[k].src, series(k))
    )

  task('watch', series('build', watchChanged))
}
