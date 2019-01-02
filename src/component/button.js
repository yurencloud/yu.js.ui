export default class YuButton {
  constructor(value, props) {
    this.node = typeof value === 'string' ? document.querySelector(value) : value
    if (!this.node) return
    if (props) {
      for (const key of Object.keys(props)) {
        this.setState(key, props[key])
      }
    }
  }

  type = (value) => {
    this.node.classList.remove('primary', 'danger', 'warning', 'info', 'success')
    this.node.classList.add(value)
  }

  text = (value) => {
    this.node.innerText = value
  }

  disabled = (value) => {
    this.node.classList.toggle('disabled', value)
  }

  plain = (value) => {
    this.node.classList.toggle('plain', value)
  }

  size = (value) => {
    this.node.classList.remove('small', 'large')
    this.node.classList.add(value)
  }

  circle = (value) => {
    this.node.classList.toggle('circle', value)
  }

  setState(stateName, value) {
    this[stateName](value)
  }

  setProps(props) {
    for (const key of Object.keys(props)) {
      this.setState(key, props[key])
    }
  }
}
