import YuComponent from '../util/component'

export default class YuRadio extends YuComponent {
  constructor(component, states) {
    super()
    this.node = this.getNode(component)

    this.states.value = ''

    this.setStates(states)

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
}
