import parseAttributes from '../common/tool'

export default class YuComponent {
    states = {}

    attributes = {}

    getNode = (component) => {
      const node = typeof component === 'string' ? document.querySelector(component) : component
      this.attributes = parseAttributes(node.attributes)
      return node
    }

    setState(stateName, value) {
      if (this[stateName]) {
        this[stateName](value)
        this.states[stateName] = value
      }
    }

    setStates(statesValue) {
      const states = statesValue || {}
      // 属性优先
      Object.assign(states, this.attributes)
      for (const key of Object.keys(states)) {
        this.setState(key, states[key])
      }
    }
}
