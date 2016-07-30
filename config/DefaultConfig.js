import path from 'path'

const DEBUG = !process.argv.includes('--release')
// const VERBOSE = process.argv.includes('--verbose')
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
]

export default class DefaultConfig {

  relRoot = '..'

  get absRoot() { return path.join(__dirname, this.relRoot) }

  dirs = {
    root: '',
    tasks: 'tasks',
    src: 'src',
    dest: 'dist',
    build: 'build',
    dist: 'dist',
    test: 'test',

    // Children
    get styles() { return `${this.src}/styles` },
    get scripts() { return `${this.src}/scripts` },
  }

  /**
   * Generate Absolute Paths
   * @return {Object}   Path get approach collection
   */
  get path() {
    const paths = {}

    Object.keys(this.dirs)
      .forEach(k => (paths[k] = (...dir) => path.join(
          this.absRoot,
          this.dirs[k],
          ...dir
      )))

    return paths
  }

  /**
   * Type Checker
   * @param  {Any}    stuff Any need to check
   * @return {String}       Type name with lowercase
   */
  type(stuff) {
    return Object.prototype.toString
      .call(stuff).slice(8, -1).toLowerCase()
  }

  /**
   * Generate Sources
   * @param  {String} type   Matching type e.g styles
   * @param  {String || Array} ...aim Should to be matched
   * @return {Array}         Matched
   */
  src(type, ...aim) {
    const i = this.path[type]
    const match = []

    const genPush = (arr, o, ex = '') =>
      this.type(o) === 'string' ? arr.push(ex + i(o)) : arr.push(ex + i(...o))

    aim.forEach(k => genPush(match, k))

    return (...exclude) => {
      exclude.forEach(k => genPush(match, k, '!'))

      return match
    }
  }

  /**
   * Destination
   * @param  {String || Array} ...child Children
   * @return {String}          Destination with dynamic type
   */
  dest(...child) {
    return this.path[DEBUG ? 'dist' : 'build'](...child)
  }

  styles = {
    src: this.src('styles', '*.scss')('+*.scss'),
    dest: this.dest('css'),
    sass: {
      outputStyle: 'expanded',
    },
    autoprefixer: {
      browsers: AUTOPREFIXER_BROWSERS,
    },
  }
}
