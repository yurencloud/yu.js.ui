export default class YuRadio {
  constructor(value, props) {
    this.node = document.querySelector(value)
    if (!this.node) {
      return
    }
    if (props) {
      for (const key in props) {
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
    if (value) {
      Array.from(this.node.children).forEach((item) => {
        item.classList.add('disabled')
      })
    } else {
      Array.from(this.node.children).forEach((item) => {
        item.classList.remove('disabled')
      })
    }
  }

  vertical = (value) => {
    if (value) {
      this.node.classList.add('vertical')
    } else {
      this.node.classList.remove('vertical')
    }
  }

  setState(stateName, value) {
    this[stateName](value)
  }
}
