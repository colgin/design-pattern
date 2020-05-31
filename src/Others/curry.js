// currying：部分求值，一个currying函数首先会接受一些参数，接受了一些参数之后，该函数并不会立即求职，而是返回
// 另一个函数，之前传入的参数会被存放起来，待到函数真正需要求值的时候，之前传入的所有参数就会一次性用于求值

// 重点
// 1. 存放传进来的参数（闭包）
// 2. 寻找真正的执行时机

function cost() {
  const args = []

  return function () {
    if (arguments.length === 0) {
      // 一次性计算
      let sum = 0
      for (let i = 0, l = args.length; i < l; i++) {
        sum += args[i]
      }
      return sum
    }
    // 把参数存起来
    ;[].push.apply(args, arguments)
  }
}

const curryCost = cost()

curryCost(10)
curryCost(20)
curryCost(30)
curryCost() // 触发求值

// curry函数：把任何函数编程curry function
// 触发计算的时机是传递参数数量与函数的参数数量一致
function curry1(fn) {
  const args = []
  return function () {
    ;[].push.apply(args, arguments)
    if (fn.length === args.length) return fn.apply(this, args)
  }
}

// test case
function sum1(a, b, c) {
  return a + b + c
}
const currySum1 = curry1(sum1)
currySum1(33)
currySum1(22)
currySum1(33) // 触发求值 88

// 触发计算的时机也可以和之前一样，当传入的参数为空的时候触发计算，适用于需要被curry的函数参数不固定的场景
function curry2(fn) {
  const args = []
  return function () {
    if (arguments.length === 0) return fn.apply(this, args)
    ;[].push.apply(args, arguments)
  }
}

// test case
function sum2() {
  return [].reduce.call(arguments, (acc, v) => {
    acc += v
    return acc
  })
}

const currySum2 = curry2(sum2)
currySum2(33)
currySum2(22)
currySum2(33)
currySum2() // 触发求值 88

// 使用apply，call可以首先方法借用（调用对象的某个方法时，不用关心该对象是否有该方法，借用
// 实现了让一个对象调用原本不属于它的方法）

// uncurrying 也是类似, 把this抽离开来了
Function.prototype.uncurry = function () {
  const self = this

  return function () {
    const context = [].shift.call(arguments)
    return self.apply(context, arguments)
  }
}

const p = [].push.uncurry()

const aryLike = {
  length: 2,
  0: 2,
  1: 3,
}
p(aryLike, 4)
aryLike // {'length': 3, '0': 2, '1': 3, '2': 4}
