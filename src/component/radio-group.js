import YuComponent from '../util/component'

export default class YuRadioGroup extends YuComponent {
    defaultStates = {
      option: [],
      value: '',
    }

    constructor(component, states) {
      super()
      this.init(component, states)
      this.radioNodesBindEvent()
    }

    radioNodesBindEvent() {
      this.radioNodes = this.node.children

      Array.from(this.radioNodes).forEach((item) => {
        item.addEventListener('click', (e) => {
          e.preventDefault()
          const { value } = e.currentTarget.querySelector('input')
          if (value === this.states.value) return
          if (e.currentTarget.classList.contains('disabled')) return
          Array.from(this.radioNodes).forEach((i) => {
            i.classList.remove('checked')
          })
          e.currentTarget.classList.add('checked')
          this.setState('value', value)
          this.emit('onChange', this.states.value)
        })
      })
    }

    option = (option) => {
      if (option.length > 0) {
        // 先清空，再设置
        this.node.innerHTML = ''
        option.forEach((item) => {
          this.node.appendChild(YuRadioGroup.createRadio(item))
        })
        // 避免重复绑定
        if (this.mounted) {
          this.radioNodesBindEvent()
        }
      }
    }

    value = (value) => {
      if (value.length > 0) {
        this.node.querySelector(`input[value=${value}]`).parentNode.parentNode.classList.add('checked')
      }
    }

    disabled = (isDisabled) => {
      Array.from(this.node.children).forEach((item) => {
        item.classList.toggle('disabled', isDisabled)
      })
    }

    vertical = (isVertical) => {
      this.node.classList.toggle('vertical', isVertical)
    }

    static createRadio(radio) {
      const label = document.createElement('LABEL')
      label.className = 'yu-radio'
      if (radio.disabled) {
        label.classList.add('disabled')
      }
      if (radio.checked) {
        label.classList.add('checked')
      }
      const span = document.createElement('SPAN')
      span.className = 'radio'
      const input = document.createElement('INPUT')
      input.type = 'radio'
      input.value = radio.value
      span.appendChild(input)
      const span2 = document.createElement('SPAN')
      span2.innerText = radio.label
      label.appendChild(span)
      label.appendChild(span2)
      return label
    }
}
