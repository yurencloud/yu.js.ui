import parseAttributesToStates from '../common/tool'

export default class YuComponent {
    states = {}

    node = {}

    initNode = (component) => {
      this.node = typeof component === 'string' ? document.querySelector(component) : component
    }

    initStates(statesValue) {
      // states优先于attributes
      // attributes只是为了方便组件初始化，改变attributes不能改变state
      const attributeStates = parseAttributesToStates(this.node.attributes)
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
}
