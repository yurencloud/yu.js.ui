import YuComponent from '../util/component'

export default class YuRadio extends YuComponent {
  constructor(component, states) {
    super()
    this.initNode(component)
    this.radioNodes = this.node.querySelectorAll('label')

    this.states.value = ''

    Array.from(this.radioNodes).forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault()
        Array.from(this.radioNodes).forEach((i) => {
          i.classList.remove('checked')
        })
        e.currentTarget.classList.add('checked')
        this.setState('value', e.currentTarget.querySelector('input').value)
      })
    })

    this.initStates(states)
  }

    value = (value) => {
      this.node.querySelector(`input[value=${value}]`).parentNode.parentNode.classList.add('checked')
    }

    disabled = (isDisabled) => {
      Array.from(this.node.children).forEach((item) => {
        item.classList.toggle('disabled', isDisabled)
      })
    }

    vertical = (isVertical) => {
      this.node.classList.toggle('vertical', isVertical)
    }
}
