export default (gulp, c, cfg) => {
  const transfer = {
    fonts: async () => await gulp.src(cfg.fonts.src)
      .pipe(gulp.changed(cfg.fonts.dest))
      .pipe(gulp.dest(cfg.fonts.dest)),

    extras: async () => await gulp.src(cfg.extras.src)
      .pipe(gulp.changed(cfg.extras.dest))
      .pipe(gulp.dest(cfg.extras.dest)),
  }

  gulp.task('fonts', transfer.fonts)
  gulp.task('extras', transfer.extras)

  gulp.task('transfer', gulp.series('fonts', 'extras'))
}
