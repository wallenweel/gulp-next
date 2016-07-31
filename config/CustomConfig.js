import DefaultConfig from './DefaultConfig'

export default class CustomConfig extends DefaultConfig {

  constructor() {
    super()

    this.mend(this.server.bs)({ port: 3030, ui: false, open: false })
  }

}
