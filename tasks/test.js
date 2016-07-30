export default (gulp) => {
  gulp.task('test', (callback) => {
    console.log(process.argv)
    callback()
  })
}
