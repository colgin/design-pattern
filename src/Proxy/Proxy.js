// 1. 虚拟代理

/* ---------------------------- */

// 虚拟代理实现懒加载

// 目标对象
const myImage = (function () {
  const imgNode = document.createElement('img')
  imgNode.body.appendChild(imgNode)

  return {
    setSrc: function (src) {
      imgNode.src = src
    },
  }
})()

// 代理对象
const proxyImage = (function () {
  const img = new Image()
  img.onload = function () {
    // 在图片加载出来之后，访问目标对象设置src
    myImage.setSrc(img.src)
  }

  return {
    setSrc: function (src) {
      myImage.setSrc('./loading-img') // 先将myImage设置为一张已经加载了的图片
      img.src = src
    },
  }
})()

// 实体对象和代理对象要保留一致的api

// test case
proxyImage.setSrc('remote.jpg')

/* ---------------------------- */

// 虚拟代理实现http请求合并

// 目标对象
const synchronousFile = function (ids) {
  console.log('sync file', ids)
}

// 代理对象
const proxySynchrounousFile = function () {
  let cache = [],
    timer = null

  return function (id) {
    cache.push(id)
    if (timer) return

    timer = setTimeout(function () {
      synchronousFile(cache)
      clearTimeout(timer)
      timer = null
      cache.length = 0 // 清空
    }, 2000)
  }
}

/* ---------------------------- */

// 2. 缓存代理

const cube = (x) => x * x * x

const createProxyFactory = function (fn) {
  const cache = {}

  return function (...args) {
    const key = args.join(',')
    if (key in cache) {
      return cache[key]
    }
    return (cache[key] = fn(...args))
  }
}

// test case
const proxyCube = createProxyFactory(cube)

console.log(proxyCube(9))
console.log(proxyCube(9))
