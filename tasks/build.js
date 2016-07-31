export default (gulp) => {
  gulp.task('build', gulp.series(
    'clean',
    ['templates', 'styles', 'scripts']
  ))
}
