import classnames from 'classnames'

export default class YuSelect {
  constructor(value, props) {
    this.node = document.getElementById(value)
    this.className = {
      'yu-button': true,
      disabled: false,
      plain: false,
      circle: false,
    }
    this.value = ''
    this.text = ''
    if (props) {
      for (const key in props) {
        this.setState(key, props[key])
      }
    }
  }

  option = (value) => {
    value.forEach((item) => {
      const li = document.createElement('LI')
      li.innerText = item.label
      li.setAttribute('data-value', item.value)
      this.node.lastElementChild.appendChild(li)
    })
    this.node.lastElementChild.addEventListener('click', (e) => {
      this.value = e.target.getAttribute('data-value')
      this.text = e.target.innerText
      this.node.children[0].firstElementChild.value = this.text
    })
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
