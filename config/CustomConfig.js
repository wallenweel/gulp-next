import DefaultConfig from './DefaultConfig'

export default class CustomConfig extends DefaultConfig {

  constructor() {
    super()

    this.update('server', { bs: { ui: false, open: false } })
  }

}
