// 使用闭包实现面向对象，并且实现变量隐藏
const event = function () {
  let private = 1

  return {
    getValue() {
      return private
    },
    setValue(val) {
      private = val
    },
  }
}

// 直接使用对象将会使得内部变量可以直接访问

const event = {
  private: 1, // 可以直接被event.private访问到
  getValue() {
    return this.private
  },
  setValue(v) {
    this.private = v
  },
}

// 或者使用构造函数
const Event = function () {
  this.private = 1 // 可以被 (new Event()).private访问到
}

Event.prototype.getValue = function () {
  return this.private
}

Event.prototype.setValue = function (v) {
  this.private = v
}
