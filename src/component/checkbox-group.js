import YuComponent from '../util/component'

export default class YuCheckboxGroup extends YuComponent {
    defaultStates = {
      option: [],
      value: [],
    }

    constructor(component, states) {
      super()
      this.init(component, states)
      this.checkboxNodesBindEvent()
    }

    checkboxNodesBindEvent() {
      this.checkboxNodes = this.node.querySelectorAll('label:not(.control)')
      this.controlNode = this.node.querySelector('.control')

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
          this.controlNode.className = 'yu-checkbox control'
          this.controlNode.classList.add(this.states.value.length === this.checkboxNodes.length ? 'checked' : 'part')
        })
      })

      if (this.controlNode) {
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
      }
    }

    option = (option) => {
      if (option.length > 0) {
        // 先清空，再设置
        this.node.innerHTML = ''
        option.forEach((item) => {
          this.node.appendChild(YuCheckboxGroup.createCheckbox(item))
        })
        if (this.mounted) {
          this.checkboxNodesBindEvent()
        }
      }
    }

    value = (value) => {
      value.forEach((item) => {
        this.node.querySelector(`input[value=${item}]`).parentNode.parentNode.classList.add('checked')
      })
    }

    disabled = (isDisabled) => {
      Array.from(this.node.children).forEach((item) => {
        item.classList.toggle('disabled', isDisabled)
      })
    }

    vertical = (isVertical) => {
      this.node.classList.toggle('vertical', isVertical)
    }

    static createCheckbox(checkbox) {
      const label = document.createElement('LABEL')
      label.classList.add('yu-checkbox')
      if (checkbox.control) {
        label.classList.add('control')
        if (checkbox.part) {
          label.classList.add('part')
        }
      }

      if (checkbox.disabled) {
        label.classList.add('disabled')
      }
      if (checkbox.checked) {
        label.classList.add('checked')
      }
      const span = document.createElement('SPAN')
      span.className = 'checkbox'
      const input = document.createElement('INPUT')
      input.type = 'checkbox'
      input.value = checkbox.value
      span.appendChild(input)
      const span2 = document.createElement('SPAN')
      span2.innerText = checkbox.label
      label.appendChild(span)
      label.appendChild(span2)
      return label
    }
}
