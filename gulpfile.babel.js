import gulp from 'gulp'
import tasksAutoLoader from './tools/tasksAutoLoader'

tasksAutoLoader(gulp, 'test', 'styles')

gulp.task('default', (callback) => {
  console.log('default')
  callback()
})
