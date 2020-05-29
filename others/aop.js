// AOP面向切面编程：把一些跟核心业务逻辑模块无关的功能模块抽象出来。业务无关的模通常包括日志统计，安全控制，
// 异常处理。在把浙西俄功能抽离出来之后，再通过“动态导入”的方式掺入业务逻辑中去，可以使得业务逻辑纯净高内聚，
// 还能够轻松复用业务无关模块

Function.prototype.before = function (fn) {
  const self = this // 原来的函数
  return function () {
    fn.apply(this, arguments)
    return self.apply(this, arguments)
  }
}

Function.prototype.after = function (fn) {
  const self = this
  return function () {
    const ret = self.apply(this, arguments)
    fn.apply(this, arguments)
    return ret
  }
}

const foo = () => {
  console.log('bar')
}

const newFn = foo
  .before(() => {
    console.log('before')
  })
  .after(() => {
    console.log('after')
  })

newFn() // before bar after
