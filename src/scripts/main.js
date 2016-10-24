const tee = 'hello'

((param) => {
  const tee = 'world'
  
  return console.log(`${param} ${tee}!`)
})(tee)
