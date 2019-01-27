import YuComponent from '../util/component'

export default class YuCheckbox extends YuComponent {
  constructor(component, states) {
    super()
    this.initNode(component)
    this.checkboxNodes = this.node.querySelectorAll('label:not(.control)')
    this.controlNode = this.node.querySelector('.control')

    this.states.value = []

    Array.from(this.checkboxNodes).forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault()
        if (e.currentTarget.classList.contains('disabled')) return
        const selectValue = e.currentTarget.querySelector('input').value
        if (e.currentTarget.classList.contains('checked')) {
          e.currentTarget.classList.remove('checked')
          this.states.value.splice(this.states.value.indexOf(selectValue), 1)
        } else {
          e.currentTarget.classList.add('checked')
          this.states.value.push(selectValue)
        }
        this.emit('onChange', this.states.value)
        this.control(this.states.value)
      })
    })

    this.controlNode.addEventListener('click', (e) => {
      e.preventDefault()
      if (e.currentTarget.classList.contains('disabled')) return
      if (this.states.value.length > 0) {
        this.states.value = []
        Array.from(this.checkboxNodes).forEach((item) => {
          item.classList.remove('checked')
        })
        this.controlNode.className = 'yu-checkbox control'
      } else {
        this.states.value = []
        Array.from(this.checkboxNodes).forEach((item) => {
          item.classList.add('checked')
          this.states.value.push(item.querySelector('input').value)
        })
        this.controlNode.className = 'yu-checkbox control checked'
      }
      this.emit('onChange', this.states.value)
    })
    this.initStates(states)
  }

    value = (value) => {
      value.forEach((item) => {
        this.node.querySelector(`input[value=${item}]`).parentNode.parentNode.classList.add('checked')
      })
      this.control(this.states.value)
    }

    disabled = (isDisabled) => {
      Array.from(this.node.children).forEach((item) => {
        item.classList.toggle('disabled', isDisabled)
      })
    }

    vertical = (isVertical) => {
      this.node.classList.toggle('vertical', isVertical)
    }

    control = (value) => {
      const controlNode = this.node.querySelector('.control')
      if (controlNode) {
        controlNode.className = 'yu-checkbox control'
        if (value.length > 0) {
          controlNode.classList.add(value.length === this.checkboxNodes.length ? 'checked' : 'part')
        }
      }
    }
}
