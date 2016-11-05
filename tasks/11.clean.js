import del from 'del'

export default (
  { task },
  c
) => task('clean', async () =>
  await del(['.tmp', c.dest('*')], { dot: true })
)
