/**
 * Tasks Auto Loader into Gulp
 * @param  {Object} gulp    Gulp
 * @param  {String} ...task Task of needing registered
 * @return {Function}       Task
 */
export default (gulp, ...task) =>
  task.forEach(
    tsk => require(`../tasks/${tsk}`).default(gulp)
  )
