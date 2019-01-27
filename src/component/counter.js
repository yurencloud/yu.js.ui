import YuComponent from '../util/component'

const calculator = require('yu.calculator')

export default class YuCounter extends YuComponent {
  constructor(component, states) {
    super()
    this.initNode(component)

    const isCounterSide = this.node.classList.contains('yu-counter-side')
    this.inputNode = this.node.querySelector('input')
    const buttons = this.node.querySelectorAll('button')
    if (isCounterSide) {
      this.addNode = buttons[0]
      this.subNode = buttons[1]
    } else {
      this.addNode = buttons[1]
      this.subNode = buttons[0]
    }

    this.states.value = 0
    this.states.step = 1

    this.addNode.addEventListener('click', (e) => {
      const sum = calculator.add(this.states.value, this.states.step)

      if (typeof this.states.max === 'number' && this.states.max <= sum) {
        this.states.value = this.states.max
        e.currentTarget.classList.add('disabled')
      } else {
        this.states.value = sum
      }

      this.changeButtonState()
      this.inputNode.value = this.states.value
      this.emit('onChange', this.states.value)
    })

    this.subNode.addEventListener('click', (e) => {
      const difference = calculator.sub(this.states.value, this.states.step)

      if (typeof this.states.min === 'number' && this.states.min >= difference) {
        this.states.value = this.states.min
        e.currentTarget.classList.add('disabled')
      } else {
        this.states.value = difference
      }
      this.changeButtonState()
      this.inputNode.value = this.states.value
      this.emit('onChange', this.states.value)
    })

    this.initStates(states)
  }

    changeButtonState = () => {
      if (typeof this.states.max === 'number'
            && this.states.max > this.states.value
            && this.addNode.classList.contains('disabled')
      ) {
        this.addNode.classList.remove('disabled')
      }

      if (typeof this.states.min === 'number'
            && this.states.min < this.states.value
            && this.subNode.classList.contains('disabled')
      ) {
        this.subNode.classList.remove('disabled')
      }
    }

    max = (value) => {
      this.states.max = value
    }

    min = (value) => {
      this.states.min = value
    }

    step = (value) => {
      this.states.step = value
    }

    disabled = (value) => {
      this.node.classList.toggle('disabled', value)
    }
}
