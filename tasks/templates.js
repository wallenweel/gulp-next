export default (gulp, cfg) => {
  const templates = async () =>
    await gulp.src(cfg.path.src('templates', '*.html'))
      .pipe(gulp.dest(cfg.path.dest()))

  gulp.task(templates)
}
