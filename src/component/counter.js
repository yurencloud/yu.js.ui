const calculator = require('yu.calculator')

export default class YuCounter {
  constructor(value, props) {
    this.node = document.querySelector(value)
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
    this.value = 0
    this.stepValue = 1
    if (props) {
      for (const key of Object.keys(props)) {
        this.setState(key, props[key])
      }
    }

    this.addNode.addEventListener('click', (e) => {
      const sum = calculator.add(this.value, this.stepValue)

      if (typeof this.maxValue === 'number' && this.maxValue < sum) {
        this.value = this.maxValue
        e.currentTarget.classList.add('disabled')
      } else {
        this.value = sum
      }

      this.changeButtonState()
      this.inputNode.value = this.value
    })
    this.subNode.addEventListener('click', (e) => {
      const difference = calculator.sub(this.value, this.stepValue)

      if (typeof this.minValue === 'number' && this.minValue > difference) {
        this.value = this.minValue
        e.currentTarget.classList.add('disabled')
      } else {
        this.value = difference
      }

      this.changeButtonState()
      this.inputNode.value = this.value
    })
  }

  changeButtonState = () => {
    if (typeof this.maxValue === 'number' && this.maxValue > this.value && this.addNode.classList.contains('disabled')) {
      this.addNode.classList.remove('disabled')
    }

    if (typeof this.minValue === 'number' && this.minValue < this.value && this.subNode.classList.contains('disabled')) {
      this.subNode.classList.remove('disabled')
    }
  }

  max = (value) => {
    this.maxValue = value
  }

  min = (value) => {
    this.minValue = value
  }

  step = (value) => {
    this.stepValue = value
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
