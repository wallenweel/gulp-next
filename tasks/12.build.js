export default (
  { task, series },
  c
) => task('build', series('clean', c.tasks))
