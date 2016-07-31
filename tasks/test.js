export default (gulp, cfg) => {
  gulp.task('test', async () => {
    // console.log(process.argv)

    console.log(cfg.templates.src)

    // console.log(cfg.srcMatching('styles')(['tt', 'gg'], ['_hh', 'aa']))

    // console.log(cfg.dest())
  })
}
