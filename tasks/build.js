export default (gulp, c, cfg) =>
  gulp.task('build', gulp.series('clean', cfg.tasks.contents))
