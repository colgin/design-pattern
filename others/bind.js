// bind 用来指定函数中的this

// 实现1
Function.prototype.bind1 = function (context) {
  const self = this
  return function () {
    self.apply(context, arguments)
  }
}

// 有时候可以再调用bind的时候再传递几个额外的参数
// 实现2
Function.prototype.bind2 = function () {
  const self = this
  const context = [].shift.call(arguments)
  const args = [].slice.call(arguments) // to array

  return function () {
    return self.apply(context, args.concat([].slice.call(arguments)))
  }
}

// test case
function foo() {
  return this.name
}

const obj = { name: 'jack' }

const f = foo.bind1(obj)

f() // jack
