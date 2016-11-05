import { common as co } from './libs/common.js'

const tee = 'hello'
;((param) => {
  const tee = 'world'

  return console.log(`${param} ${tee}!`, co)
})(tee)
