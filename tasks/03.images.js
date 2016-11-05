import imagemin from 'gulp-imagemin'

export default ({ task, src, dest, changed, $if },
  c,
  { env }
) => task('images', async () => await src(c.src)
  .pipe($if(env.prod, imagemin(c.imagemin)))

  .pipe(changed(c.dest))
  .pipe(dest(c.dest))
)
