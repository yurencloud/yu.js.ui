export default class YuRadio {
  constructor(value, props) {
    this.node = typeof value === 'string' ? document.querySelector(value) : value
    if (!this.node) return
    if (props) {
      for (const key of Object.keys(props)) {
        this.setState(key, props[key])
      }
    }
    this.value = ''
    Array.from(this.node.querySelectorAll('label')).forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault()
        Array.from(this.node.querySelectorAll('label')).forEach((i) => {
          i.classList.remove('checked')
        })
        e.currentTarget.classList.add('checked')
        this.value = e.currentTarget.querySelector('input').value
      })
    })
  }

  defaultValue = (value) => {
    this.node.querySelector(`input[value=${value}]`).parentNode.parentNode.classList.add('checked')
  }

  disabled = (value) => {
    Array.from(this.node.children).forEach((item) => {
      item.classList.toggle('disabled', value)
    })
  }

  vertical = (value) => {
    this.node.classList.toggle('vertical', value)
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
