class Test {
  contructor() {

  }

  static get a() {
    console.log(this)
  }

  name = Test.a

  static cc = 'ddd'
  static test() {
    console.log(this.cc)
  }
}
class Test2 extends Test {
  constructor() {
    super()
  }
  static cc = 'cc'
}
const tee = new Test2()

console.log(tee.name)
