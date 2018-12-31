import classnames from 'classnames'

export default class YuButton {
  constructor(value, props) {
    this.node = document.querySelector(value)
    if (!this.node) {
      return
    }
    this.className = {
      'yu-button': true,
      disabled: false,
      plain: false,
      circle: false,
    }
    if (props) {
      for (const key in props) {
        this.setState(key, props[key])
      }
    }
  }

  type = (value) => {
    Object.assign(this.className, {
      primary: false, danger: false, warning: false, info: false, success: false,
    }, { [value]: true })
    this.node.className = classnames(this.className)
  }

  text = (value) => {
    this.node.innerText = value
  }

  disabled = (value) => {
    this.className.disabled = value
    this.node.className = classnames(this.className)
  }

  plain = (value) => {
    this.className.plain = value
    this.node.className = classnames(this.className)
  }

  size = (value) => {
    Object.assign(this.className, { small: false, large: false }, { [value]: true })
    this.node.className = classnames(this.className)
  }

  circle = (value) => {
    this.className.circle = value
    this.node.className = classnames(this.className)
  }

  setState(stateName, value) {
    this[stateName](value)
  }
}
