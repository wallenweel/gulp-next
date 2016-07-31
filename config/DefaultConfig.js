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
    get templates() { return `${this.src}/templates` },
  }

  tasks = {
    get entry() {
      const r = []
      r.push(...this.contents, ...this.tools)
      return r
    },
    contents: [
      'templates',
      'scripts',
      'styles',
      // 'images',
    ],
    tools: [
      'test',
      'clean',
      'build',
      'watch',
      'server',
    ],
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
  type(stuff, type = '') {
    const r = Object.prototype.toString
      .call(stuff).slice(8, -1).toLowerCase()

    if (!type) return r

    return r === type
  }

  /**
   * Mending Default Configuration
   * @param  {String || Object} type Need to be mended
   * @return {Function}      Param "props" is updating options
   */
  mend(type) {
    const aim = this.type(type, 'object') ? type : this[type]

    /**
     * Updating options
     * @param  {Object} props New options
     * @return Assignment or Recursion
     */
    return (props) => {
      Object.keys(props).forEach(k =>
        !this.type(props[k], 'object') ?
        (aim[k] = props[k]) :
        this.mend(aim[k])(props[k])
      )
    }
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
      this.type(o, 'string') ? arr.push(ex + i(o)) : arr.push(ex + i(...o))

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

  /**
   * Match Sources for Treatment
   * @param  {String} type Sources type e.g "styles"
   * @return {Function}      Including and excluding
   */
  srcMatching(type) {
    const match = []

    return (include, exclude) => {
      const cwd = this.path[type]
      const mge = o => this.type(o, 'array') ? cwd(...o) : cwd(o)
      const gen = (inc, ex = '') => {
        if (!inc.length && !ex) return () => false

        if (this.type(inc, 'array')) match.push(...(inc.map(i => ex + mge(i))))
        else match.push(ex + mge(inc))

        return exc => exc ? gen(exc, '!')() : true
      }

      return gen(include)(exclude) ? match : console.error('Files Including is Must')
    }
  }

  // demo = {
  //   /** .1 */
  //   src: this.src('type', 'include')('exclude'),
  //
  //   /** .2 */
  //   include: [] || '', exclude: [] || '',
  //   matching: type => this.srcMatching(type),
  //   get src() { return this.matching('styles')(this.include, this.exclude) },
  // }

  styles = {
    matching: type => this.srcMatching(type),
    get src() { return this.matching('styles')(this.include, this.exclude) },
    dest: this.dest('css'),

    include: ['*.scss'],
    exclude: [],

    sass: {
      outputStyle: 'expanded',
    },

    autoprefixer: {
      browsers: AUTOPREFIXER_BROWSERS,
    },
  }

  scripts = {
    matching: type => this.srcMatching(type),
    get src() { return this.matching('scripts')(this.include, this.exclude) },
    dest: this.dest('js'),

    include: ['*.{js,jsx}'],
    exclude: ['_*.{js,jsx}'],
  }

  templates = {
    matching: type => this.srcMatching(type),
    get src() { return this.matching('templates')(this.include, this.exclude) },
    dest: this.dest(),

    include: ['*.{html,pug}'],
    exclude: ['_*.{html,pug}'],

    pug: {
      pretty: DEBUG ? 1 : 0,
    },
  }

  watch = {
    listen: this.tasks.contents,
  }

  server = {
    /** More options see: www.browsersync.io/docs/options */
    bs: {
      reloadOnRestart: true,
      port: 3000,
      server: {
        baseDir: this.dest(),
        index: 'index.html',
      },
      files: this.dest('**/*'),
      open: true,
      notify: true,

      // "info", "debug", "warn", or "silent"
      logLevel: 'debug',
    },
  }

}
