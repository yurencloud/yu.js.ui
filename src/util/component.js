export default class YuComponent {
    states = {}

    node = {}

    initNode = (component) => {
      this.node = typeof component === 'string' ? document.querySelector(component) : component
    }

    initStates(statesValue) {
      // states优先于attributes
      // attributes只是为了方便组件初始化，改变attributes不能改变state
      const attributeStates = this.parseAttributesToStates(this.node.attributes)
      const states = Object.assign(attributeStates, statesValue || {})
      this.setStates(states)
      this.node.setAttribute(':mounted', true)
    }

    setState(stateName, value) {
      if (this[stateName]) {
        this[stateName](value)
        this.states[stateName] = value
      }
    }

    setStates(states) {
      for (const key of Object.keys(states)) {
        this.setState(key, states[key])
      }
    }

    parseAttributesToStates(attributes) {
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

          if (start === '$') {
            states[name] = YU.Data[item.value.substr(1)]
            return
          }

          states[name] = item.value
        }
      })
      return states
    }
}
