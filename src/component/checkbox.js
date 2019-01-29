import YuComponent from '../util/component'

export default class YuCheckbox extends YuComponent {
    defaultStates = {
      value: '',
    }

    constructor(component, states) {
      super()
      this.init(component, states)

      this.inputNode = this.node.querySelector('input')

      if (this.node.parentNode.classList.contains('yu-checkbox-group')) return
      this.node.addEventListener('click', (e) => {
        e.preventDefault()
        if (e.currentTarget.classList.contains('disabled')) return
        this.states.checked = !this.states.checked
        this.states.value = this.states.checked ? this.inputNode.value : ''
        this.setState('checked', this.states.checked)
        this.emit('onChange', this.states.value)
      })
    }

    option = (option) => {
      const span = document.createElement('SPAN')
      span.className = 'checkbox'
      const input = document.createElement('INPUT')
      input.type = 'checkbox'
      input.value = option.value
      span.appendChild(input)
      const span2 = document.createElement('SPAN')
      span2.innerText = option.label
      this.node.appendChild(span)
      this.node.appendChild(span2)
    }

    // 设置默认值使用
    value = () => {
    }

    checked = (isChecked) => {
      this.node.classList.toggle('checked', isChecked)
    }

    disabled = (isDisabled) => {
      this.node.classList.toggle('disabled', isDisabled)
    }
}
