export default function parseAttributesToStates(attributes) {
  const states = {}

  Array.from(attributes).forEach((item) => {
    if (item.name.indexOf(':') === 0) {
      // 空value为true '开头为字符串，1开头为数字, { [ 开头为json对象
      const name = item.name.substr(1)
      const start = item.value[0]
      if (item.value === '') {
        states[name] = true
        return
      }

      if (start === '\'' || start === '"') {
        states[name] = item.value.substr(1, item.value.length - 2)
        return
      }

      if (start === '{' || start === '[') {
        states[name] = JSON.parse(item.value)
        return
      }

      if (/[0-9]/.test(start)) {
        states[name] = Number(start)
        return
      }

      if (item.value === 'true' || item.value === 'false') {
        states[name] = item.value === 'true'
        return
      }

      states[name] = YU.Data[item.value]
    }
  })
  return states
}
