export default (
  { task, src, dest, series, changed },
  c,
  { fonts, extras }
) => {
  task('fonts', async () => await src(fonts.src)
    .pipe(changed(fonts.dest))
    .pipe(dest(fonts.dest))
  )

  task('extras', async () => await src(extras.src)
    .pipe(changed(extras.dest))
    .pipe(dest(extras.dest))
  )

  task('transfer', series('fonts', 'extras'))
}
