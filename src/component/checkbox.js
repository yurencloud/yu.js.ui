export default class YuCheckbox {
  constructor(value, props) {
    this.node = document.querySelector(value)
    this.checkboxNode = this.node.querySelectorAll('label:not(.control)')
    this.controlNode = this.node.querySelector('.control')
    if (!this.node) return
    this.value = []
    if (props) {
      for (const key of Object.keys(props)) {
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
    Array.from(this.node.children).forEach((item) => {
      item.classList.toggle('disabled', value)
    })
  }

  vertical = (value) => {
    this.node.classList.toggle('vertical', value)
  }

  control = (value) => {
    const controlNode = this.node.querySelector('.control')
    if (controlNode) {
      controlNode.className = 'yu-checkbox control'
      if (value.length > 0) {
        controlNode.classList.add(value.length === this.checkboxNode.length ? 'checked' : 'part')
      }
    }
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
