import path from 'path'

const DEBUG = !process.argv.includes('--release')
const VERBOSE = process.argv.includes('--verbose')

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

const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? 'development' : 'production',
  __DEV__: DEBUG,
}

export default class DefaultConfig {

  constructor(dirs) {
    // this.srcdirs = dirs
  }

  static relativeRoot = '..'

  env = {
    dev: DEBUG,
    prod: !DEBUG,
  }

  globals = GLOBALS

  static rootdirs = {
    root: '',
    tasks: 'tasks',
    src: 'src',
    build: 'build',
    dist: 'dist',
    test: 'test',
  }

  static srcdirs = {
    styles: 'styles',
    scripts: 'scripts',
    templates: 'templates',
    images: 'images',
    fonts: 'fonts',
    extras: 'extras',
  }

  static alias = {
    ...DefaultConfig.rootdirs,
    ...Object.keys(DefaultConfig.srcdirs).reduce((previous, current) => {
      previous[current] = `${DefaultConfig.rootdirs.src}/${DefaultConfig.srcdirs[current]}`
      return previous
    }, {}),
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
      'images',
      'transfer',
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
    const result = {}
    const absoluteRoot = path.join(__dirname, DefaultConfig.relativeRoot)

    Object.keys(DefaultConfig.alias)
      .forEach(k => (result[k] =
        (...dir) => path.join(absoluteRoot, DefaultConfig.alias[k], ...dir)
      ))

    return result
  }

  static get cwd() {
    return Object.keys(DefaultConfig.alias).reduce((prev, curr) => {
      prev[curr] = (...dir) => DefaultConfig.alias[curr] + (dir ? `/${dir.join('/')}` : '')
      return prev
    }, {})
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
   * Update by chain
   */
  renew(type, props) {
    this.mend(type)(props)

    return this
  }

  /**
   * Generate Sources
   * @param  {String} type   Matching type e.g styles
   * @param  {String || Array} ...aim Should to be matched
   * @return {Array}         Matched
   */
  static src(
    type,
    { include = [], exclude = [] },
    match = []
  ) {
    const cwd = DefaultConfig.cwd[type]

    include.forEach(k => match.push(cwd(k)))
    exclude.forEach(k => match.push(`!${cwd(k)}`))

    return match
  }

  /**
   * Destination
   * @param  {String || Array} ...child Children
   * @return {String}          Destination with dynamic type
   */
  dest(...child) {
    return DefaultConfig.cwd[DEBUG ? DefaultConfig.alias.dist : DefaultConfig.alias.build](...child)
  }

  /**
   * Match Sources for Treatment
   * @param  {String} type Sources type e.g "styles"
   * @return {Function}      Including and excluding
   */
  srcMatching(type) {
    const match = []

    return (include, exclude) => {
      const cwd = this.cwd[type]
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

  styles = {
    get src() { return DefaultConfig.src('styles', this) },
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
    get src() { return DefaultConfig.src('scripts', this) },
    dest: this.dest('js'),

    include: ['*.{js,jsx}'],
    exclude: ['_*.{js,jsx}'],
  }

  templates = {
    get src() { return DefaultConfig.src('templates', this) },
    dest: this.dest(),

    include: ['*.{html,pug}'],
    exclude: ['_*.{html,pug}'],

    pug: {
      pretty: DEBUG ? 1 : 0,
    },
  }

  images = {
    get src() { return DefaultConfig.src('images', this) },
    dest: this.dest('images'),

    include: ['**/*.{jpg,jpeg,png,gif,svg}'],
    exclude: [],

    /** More options see: github.com/sindresorhus/gulp-imagemin */

  }

  fonts = {
    get src() { return DefaultConfig.src('fonts', this) },
    dest: this.dest('fonts'),

    include: ['**/*.{woff,woff2,ttf,eot,svg}'],
    exclude: [],
  }


  extras = {
    get src() { return DefaultConfig.src('extras', this) },
    dest: this.dest(),

    include: ['**/*'],
    exclude: [],
  }

  watch = {
    listen: this.tasks.contents,
  }

  transfer = {
    src: [...this.fonts.src, ...this.extras.src],
    dest: this.dest,
  }

  server = {
    /** More options see: browsersync.io/docs/options */
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
      logLevel: VERBOSE ? 'debug' : 'info',
    },
  }

}
