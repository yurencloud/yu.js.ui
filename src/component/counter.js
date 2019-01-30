import YuComponent from '../util/component'

const calculator = require('yu.calculator')

export default class YuCounter extends YuComponent {
    defaultStates = {
      value: 0,
      step: 1,
    }

    constructor(component, states) {
      super()
      this.initNode(component)

      const isCounterSide = this.node.classList.contains('yu-counter-side')
      this.inputNode = this.node.getElementsByTagName('INPUT')[0]
      const buttons = this.node.getElementsByTagName('BUTTON')
      if (isCounterSide) {
        this.addNode = buttons[0]
        this.subNode = buttons[1]
      } else {
        this.addNode = buttons[1]
        this.subNode = buttons[0]
      }

      this.addNode.addEventListener('click', (e) => {
        if (e.currentTarget.classList.contains('disabled')) return
        const sum = calculator.add(this.states.value, this.states.step)
        console.log(this.states.value, this.states.step, sum)

        if (this.states.max <= sum) {
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
        if (e.currentTarget.classList.contains('disabled')) return
        const difference = calculator.sub(this.states.value, this.states.step)

        if (this.states.min >= difference) {
          this.states.value = this.states.min
          e.currentTarget.classList.add('disabled')
        } else {
          this.states.value = difference
        }
        this.changeButtonState()
        this.inputNode.value = this.states.value
        this.emit('onChange', this.states.value)
      })

      this.inputNode.addEventListener('blur', (e) => {
        const value = Number(e.target.value)
        if (this.states.min >= value) {
          this.states.value = this.states.min
          this.subNode.classList.add('disabled')
          this.inputNode.value = this.states.value
          this.emit('onChange', this.states.value)
        }
        if (this.states.max <= value) {
          this.states.value = this.states.max
          this.addNode.classList.add('disabled')
          this.inputNode.value = this.states.value
          this.emit('onChange', this.states.value)
        }
        this.changeButtonState()
      })

      this.initStates(states)
    }

    changeButtonState = () => {
      if (this.states.max > this.states.value && this.addNode.classList.contains('disabled')
      ) {
        this.addNode.classList.remove('disabled')
      }

      if (this.states.min < this.states.value && this.subNode.classList.contains('disabled')
      ) {
        this.subNode.classList.remove('disabled')
      }
    }

    value = () => {
    }

    max = () => {
    }

    min = () => {
    }

    step = () => {
    }

    disabled = (value) => {
      this.inputNode.setAttribute('disabled', value)
      this.inputNode.parentNode.classList.toggle('disabled', value)
      this.addNode.classList.toggle('disabled', value)
      this.subNode.classList.toggle('disabled', value)
    }
}
