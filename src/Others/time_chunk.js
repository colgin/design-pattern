// time_chunk把一个大任务拆分成分批进行

// 模拟数据
var ary = []
for (let i = 0; i < 1000; i++) {
  ary.push(i)
}

// before
const renderFriendList = (data) => {
  for (let i = 0, l = data.length; i < l; i++) {
    const div = document.createElement('div')
    div.innerHTML = i
    document.body.append(div)
  }
}

renderFriendList(ary)

// after
/**
 *
 * @param {Array} ary 创建节点需要用到的数据
 * @param {Function} fn 创建节点的函数
 * @param {Number} count 每一批创建的节点的数量
 */
const timeChunk = (ary, fn, count) => {
  let obj, t
  const len = ary.length

  const doTask = function () {
    for (let i = 0; i < Math.min(count || 1, ary.length); i++) {
      fn(ary.shift())
    }
  }

  return () => {
    t = setInterval(() => {
      if (ary.length === 0) {
        return clearInterval(t) // 所有任务都完成了
      }
      doTask()
    }, 200) // 执行间隔，可以传递参数决定
  }
}

timeChunk(
  ary,
  (n) => {
    const div = document.createElement('div')
    div.innerHTML = n
    document.body.append(div)
  },
  10
)()
