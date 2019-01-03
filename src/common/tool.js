export default function parseAttributes(attributes) {
  const data = {}
  if (typeof YU === 'object') {
    data = YU.Data
  }
  const states = {}
  Array.from(attributes).forEach((item) => {
    if (item.name.indexOf(':') === 0) {
      // '开头为字符串，1开头为数字, { [ 开头为json对象
      if (item.value.indexOf('{') === 0 || item.value.indexOf('[') === 0) {
        states[item.name.substr(1)] = JSON.parse(item.value)
      } else {
        states[item.name.substr(1)] = item.value
      }

      // TODO::所有使用变量的组件，setData改变变量时，可以同时改变所有正在使用这个变量的组件。
        // TODO::获取实例改为使用函数，而不是直接新建实例，这样就能把获取到的实例都挂到YU树上，并可以做一些生命周期的事情
      // switch (item.name[0]) {
      //     case '{'
      // }
    }
  })
  return states
}
