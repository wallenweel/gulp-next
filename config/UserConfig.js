import DefaultConfig from './DefaultConfig'

export default class UserConfig extends DefaultConfig {

  constructor() {
    super()

    // this.srcdirs.styles = 'styles0'
    // console.log(this);
    this.renew(this.server.bs, {
      port: 3030,
      ui: false,
      open: false,
    })
    .renew('styles', {
      dest: this.dest('css0'),
    })
  }

}
