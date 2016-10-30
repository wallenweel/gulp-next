// import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import browserify from 'gulp-browserify'
import plumber from 'gulp-plumber'
// import webpack from 'gulp-webpack'
// import named from 'vinyl-named'

export default (gulp, c, cfg) => {
  const scripts = async () =>
    // await browserify({
    //   entries: c.src,
    //   debug: true,
    // })
    // .transform('babelify')
    // .bundle()
    await gulp.src(c.src)
      .pipe(plumber())

      .pipe(browserify({
        debug: true,
        transform: ['babelify'],
      }))
      
      // .pipe(babel())
      // .pipe(named())
      // .pipe(webpack({
      //   watch: true,
      //   module: {
      //     loaders: [{
      //       test: /\.js$/,
      //       loader: 'babel-loader',
      //       // exclude: /node_modules/,
      //       // include: settings.path.app(),
      //     }],
      //   },
      // }))

      .pipe(gulp.if(cfg.env.prod, uglify()))
      .pipe(gulp.if(cfg.env.prod, gulp.rename({
        suffix: '.min',
      })))

      .pipe(gulp.changed(c.dest))
      .pipe(gulp.dest(c.dest))

  gulp.task(scripts)
}
