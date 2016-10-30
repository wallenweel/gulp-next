import { common } from './libs/common.js'

const tee = 'hello'

;((param) => {
  const tee = 'world'

  return console.log(`${param} ${tee}!`, common)
})(tee)
