import spritesmith from 'gulp.spritesmith'

export default (
  { task, src, dest },
  c
) => task('sprites', async () => await src(c.src)
  .pipe(spritesmith(c.params))
  .pipe(dest(c.dest))
)
