export default class YuComponent {
    states = {}

    node = {}

    initNode = (component) => {
      this.node = typeof component === 'string' ? document.querySelector(component) : component
      // attributes只是为了方便组件初始化，改变attributes不能改变state
      this.states = this.parseAttributesToStates(this.node.attributes)
    }

    initStates(statesValue) {
      // states优先于attributes
      this.states = Object.assign(this.defaultStates || {}, this.states, statesValue || {})
      this.setStates(this.states)
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
            states[name] = yu.data[item.value.substr(1)]
            return
          }

          states[name] = item.value
        }

        // 绑定事件
        if (item.name.indexOf('@') === 0) {
          const eventName = `on${item.name[1].toLocaleUpperCase()}${item.name.substr(2)}`
          this[eventName] = yu.data[item.value]
        }
      })
      return states
    }

    // 触发事件
    emit(eventName, ...args) {
      if (this[eventName]) {
        this[eventName](...args)
      }
    }
}
