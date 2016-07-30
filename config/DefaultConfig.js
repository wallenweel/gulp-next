import path from 'path'

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

}
