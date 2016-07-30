export default (gulp, config) => {
  gulp.task('test', (callback) => {
    // console.log(process.argv)
    console.log(config.path.tasks('test.js'))
    
    callback()
  })
}
