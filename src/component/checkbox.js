import classnames from 'classnames'

export default class YuCheckbox {
  constructor(value, props) {
    this.node = document.querySelector(value)
    this.checkboxNode = this.node.querySelectorAll('label:not(.control)')
    this.controlNode = this.node.querySelector('.control')
    if (!this.node) {
      return
    }
    this.value = []
    if (props) {
      for (const key in props) {
        this.setState(key, props[key])
      }
    }
    Array.from(this.checkboxNode).forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault()
        if (e.currentTarget.classList.contains('disabled')) return
        const selectValue = e.currentTarget.querySelector('input').value
        if (e.currentTarget.classList.contains('checked')) {
          e.currentTarget.classList.remove('checked')
          this.value.splice(this.value.indexOf(selectValue), 1)
        } else {
          e.currentTarget.classList.add('checked')
          this.value.push(selectValue)
        }
        this.control(this.value)
      })
    })

    this.controlNode.addEventListener('click', (e) => {
      e.preventDefault()
      if (e.currentTarget.classList.contains('disabled')) return
      if (this.value.length > 0) {
        this.value = []
        Array.from(this.checkboxNode).forEach((item) => {
          item.classList.remove('checked')
        })
        this.controlNode.className = 'yu-checkbox control'
      } else {
        this.value = []
        Array.from(this.checkboxNode).forEach((item) => {
          item.classList.add('checked')
          this.value.push(item.querySelector('input').value)
        })
        this.controlNode.className = 'yu-checkbox control checked'
      }
    })
  }

  defaultValue = (value) => {
    this.node.querySelector(`input[value=${value}]`).parentNode.parentNode.classList.add('checked')
    this.value.push(value)
    this.control(this.value)
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

  control = (value) => {
    const controlNode = this.node.querySelector('.control')
    if (controlNode) {
      if (value.length > 0) {
        if (value.length === this.checkboxNode.length) {
          controlNode.className = 'yu-checkbox control checked'
        } else {
          controlNode.className = 'yu-checkbox control part'
        }
      } else {
        controlNode.className = 'yu-checkbox control'
      }
    }
  }

  setState(stateName, value) {
    this[stateName](value)
  }
}
