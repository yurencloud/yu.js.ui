import convertToCamelCase from '../common/tool'

export default class YuComponent {
    states = {}

    node = {}

    mounted = false

    /*
    * 初始化组件
    * @param {String | DOM} component - 组件选择器或DOM元素
    * @param {Object} states - 参数状态
    * */
    init(component, states) {
      this.initNode(component)
      this.initStates(states)
    }

    /*
    * 初始化组件DOM元素节点，并从节点上获取所有属性状态
    * @param {String | DOM} component - 组件选择器或DOM元素
    * */
    initNode(component) {
      this.node = typeof component === 'string' ? document.querySelector(component) : component
      // attributes只是为了方便组件初始化，改变attributes不能改变state
      this.states = this.parseAttributesToStates(this.node.attributes)
    }


    /*
    * 初始化组件状态，合并默认状态>属性状态>参数状态，并执行每个状态方法
    * @param {Object} states - 参数状态
    * */
    initStates(states) {
      // states优先于attributes
      this.states = Object.assign(this.defaultStates || {}, this.states, states || {})
      this.setStates(this.states)
      this.node.setAttribute('mounted', '')
      this.mounted = true
    }

    /*
    * 执行状态方法并更新状态
    * @param {String} stateName - 状态名，也可称为状态方法名
    * @param {Any} value - 状态值，传入状态方法的参数
    * 判断状态方法是否存在，若存在则执行状态方法并更新状态
    * */
    setState(stateName, value) {
      if (this[stateName]) {
        this[stateName](value)
        this.states[stateName] = value
      }
    }

    /*
    * 批量执行状态方法
    * @param {Object} states - 状态集合对象
    * */
    setStates(states) {
      for (const key of Object.keys(states)) {
        this.setState(key, states[key])
      }
    }

    /*
    * 转化组件DOM节点属性为组件状态，属性状态
    * @param {Attributes} attributes - 组件DOM节点所有属性
    * */
    parseAttributesToStates = (attributes) => {
      const states = {}

      Array.from(attributes).forEach((item) => {
        if (item.name.indexOf(':') === 0) {
          this.node.removeAttribute(item.name)
          const name = convertToCamelCase(item.name.substr(1))
          const start = item.value[0]
          if (item.value === '') {
            states[name] = true
            return
          }

          if (start === '{' || start === '[') {
            states[name] = JSON.parse(item.value)
            return
          }

          // 可以有负号，可以是整数，可以是小数, 如果带有其他字符，则按字符串处理
          if (/[-?0-9]/.test(start)) {
            const num = Number(item.value)
            if (isNaN(num)) {
              states[name] = item.value
            } else {
              states[name] = num
            }
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
          this.node.removeAttribute(item.name)
          const eventName = `on${item.name[1].toLocaleUpperCase()}${item.name.substr(2)}`
          this[eventName] = yu.data[item.value.substr(1)]
        }
      })
      return states
    }

    /*
    * 触发组件事件
    * @param {String} eventName - 组件事件名称， on开头，驼峰式命名，例如：onChange, onSelect, onWrite等
    * @param {Arguments} args - 其他参数
    * */
    emit(eventName, ...args) {
      if (this[eventName]) {
        this[eventName](...args)
      }
    }
}
