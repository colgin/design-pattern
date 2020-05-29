function Singleton(name) {
  this.name = name
  this.instance = null
}

Singleton.prototype.getInstance = function () {
  if (!this.instance) {
    this.instance = new Singleton()
  }
  return this.instance
}

// 或者使用闭包
function Singleton(name) {
  this.name = name
}

Singleton.prototype.getInstance = (function () {
  let instance = null
  return function () {
    if (!instance) {
      instance = new Singleton()
    }
    return instance
  }
})()

// 优点：简单
// 缺点：不透明，使用者必须知道这是一个单例类，还要使用getInstance方法

function Singleton() {
  if (typeof Singleton.instance === 'object') return Singleton.instance
  Singleton.instance = this
  return this
}

// 惰性单例
// 在需要的时候才创建对象实例
// 和上面使用类的Singleton有异曲同工之妙，但是这里弱化了类的改变

/**
 *
 * @param {Function} fn 用来创建对象的函数
 */
const getSingle = function (fn) {
  let instance
  return function () {
    return instance || (instance = fn.apply(this, arguments))
  }
}
