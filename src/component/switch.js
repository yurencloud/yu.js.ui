import YuComponent from '../util/component'

export default class YuSwitch extends YuComponent {
    defaultStates = {
      type: 'primary',
    }

    constructor(component, states) {
      super()
      this.init(component, states)
      this.inputNode = this.node.querySelector('input')
      this.switchNode = this.node.querySelector('.switch')
    }

    type = (type) => {
      this.node.classList.remove('primary', 'danger', 'warning', 'info', 'success')
      this.node.classList.add(type)
    }

    on = (isOn) => {
      this.switchNode.classList.toggle('on', isOn)
      this.switchNode.classList.toggle(this.states.type, isOn)
    }

    label

    disabled = (isDisabled) => {
      this.node.classList.toggle('disabled', isDisabled)
    }

    plain = (isPlain) => {
      this.node.classList.toggle('plain', isPlain)
    }

    size = (size) => {
      this.node.classList.remove('small', 'large')
      this.node.classList.add(size)
    }

    circle = (isCircle) => {
      this.node.classList.toggle('circle', isCircle)
    }
}
