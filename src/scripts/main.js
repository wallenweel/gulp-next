import { common } from './libs/common.js'
// import jquery from 'jquery'

const tee = 'hello'
// const $body = jquery('body')
;((param) => {
  const tee = 'world'

  return console.log(`${param} ${tee}!`, common)
})(tee)
