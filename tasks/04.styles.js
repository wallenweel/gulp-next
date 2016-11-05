import sass from 'gulp-sass'
import cssnano from 'gulp-cssnano'
import autoprefixer from 'gulp-autoprefixer'

export default (
  { task, src, dest, changed, $if, rename },
  c,
  { env }
) => task('styles', async () => await src(c.src)
  .pipe(sass(c.sass)).on('error', sass.logError)

  .pipe(autoprefixer(c.autoprefixer))

  .pipe($if(env.prod, cssnano()))
  .pipe($if(env.prod, rename({ suffix: c.min })))

  .pipe(changed(c.dest))
  .pipe(dest(c.dest))
)
