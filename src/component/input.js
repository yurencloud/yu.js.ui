import classnames from 'classnames'

export default class YuInput {
  constructor(value, props) {
    this.node = document.querySelector(value)
    this.input = this.node.querySelector('input')
    this.value = ''
    this.className = {
      'yu-input': true,
      disabled: false,
    }

    if (props) {
      for (const key in props) {
        this.setState(key, props[key])
      }
    }

    this.input.addEventListener('change', (e) => {
      this.value = e.target.value
      console.log(this.value)
    })
    this.input.addEventListener('input', (e) => {
      this.value = e.target.value
      console.log(this.value)
      this.showClear()
    })
  }

  defaultValue = (value) => {

  }

  disabled = (value) => {
    this.className.disabled = value
    this.node.className = classnames(this.className)
  }

  showClear = () => {
    const span = document.createElement('SPAN')
    span.className = 'clearable'
    const i = document.createElement('I')
    i.className = 'iconfont icon-close-circle'
    span.appendChild(i)
    this.node.appendChild(span)
    i.addEventListener('click', (e) => {
      console.log(2)
      this.input.value = ''
      this.value = ''
      e.target.parentNode.parentNode.removeChild(e.target.parentNode)
    })
  }

  setState(stateName, value) {
    this[stateName](value)
  }
}
