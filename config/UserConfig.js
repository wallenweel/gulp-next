import DefaultConfig from './DefaultConfig'

export default class UserConfig extends DefaultConfig {

  constructor() {
    super()

    this.renew(this.server.bs, {
      port: 3030,
      ui: false,
      open: false,
    })
  }

}
