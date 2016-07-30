export default (gulp, cfg) => {
  gulp.task('test', async () => {
    // console.log(process.argv)

    console.log(cfg.styles.src)

    console.log(cfg.dest())
  })
}
