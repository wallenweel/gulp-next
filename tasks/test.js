export default (gulp, cfg) => {
  const test = async () => {
    // console.log(process.argv)

    console.log(cfg.templates.src)

    // console.log(cfg.srcMatching('styles')(['tt', 'gg'], ['_hh', 'aa']))

    // console.log(cfg.dest())
  }

  gulp.task(test)
}
