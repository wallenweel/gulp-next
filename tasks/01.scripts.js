import uglify from 'gulp-uglify'
import browserify from 'gulp-browserify'
import plumber from 'gulp-plumber'

export default (
  { task, src, dest, changed, $if, rename },
  c,
  { env }
) => task('scripts', async () => await src(c.src)
  .pipe(plumber())

  .pipe(browserify(c.browserify))

  .pipe($if(env.prod, uglify()))
  .pipe($if(env.prod, rename({
    suffix: c.min,
  })))

  .pipe(changed(c.dest))
  .pipe(dest(c.dest))
)
