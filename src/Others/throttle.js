// 节流：降低函数执行次数
// 某些场景函数会非常频繁地触发，但实际上并不需要如此频繁地触发，只需要间隔一段时间触发即可。
// 典型场景：window.onresize, mouseover事件回调函数

const throttle = function (fn, interval) {
  let timer = null
  return function () {
    const self = this
    if (timer === null) {
      timer = setTimeout(function () {
        fn.call(self, arguments)
        clearTimeout(timer)
        timer = null
      }, interval)
    }
  }
}

// 有时候需要在一次事件触发的时候执行函数，而不是等待一段时间才执行第一次，可以加上一个标记
const throttle2 = function (fn, interval) {
  let timer = null
  let firsttime = true
  return function () {
    const self = this
    if (firsttime) {
      firsttime = false
      fn.apply(this, arguments)
    }
    if (timer === null) {
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
        fn.apply(self, arguments)
      }, interval)
    }
  }
}
