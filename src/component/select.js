import YuComponent from '../util/component'

export default class YuSelect extends YuComponent {
  constructor(component, states) {
    super()
    this.init(component, states)
    this.inputNode = this.node.querySelector('input')
    this.inputIconNode = this.node.querySelector('.suffix>i')
    this.optionNode = this.node.querySelector('.yu-option')

    this.states.value = ''
    this.states.text = ''

    if (this.states.multi) {
      this.states.value = []
      this.states.text = []
    }

    this.inputNode.addEventListener('focus', () => {
      this.setState('visible', !this.states.disabled)
    })
    this.inputNode.addEventListener('blur', (e) => {
      this.setState('visible', false)
      this.setState('clear', e.target.value.length > 0)
    })
    this.inputNode.addEventListener('input', (e) => {
      this.setState('clear', e.target.value.length > 0)
    })
    this.optionNode.addEventListener('mousedown', (e) => {
      this.onSelect(e.target.getAttribute('data-value'), e.target.innerText)
      if (this.states.multi) {
        e.target.classList.add('hide')
      } else {
        Array.from(e.target.parentNode.children).forEach((item) => {
          item.classList.remove('active')
        })
        e.target.classList.add('active')
      }
    })
  }

    clear = (isClearable) => {
      if (isClearable) {
        this.inputIconNode.classList.remove('icon-angle-down')
        this.inputIconNode.classList.add('icon-close-circle')
        this.inputIconNode.addEventListener('click', this.clearEvent)
      } else {
        this.inputIconNode.classList.remove('icon-close-circle')
        this.inputIconNode.classList.add('icon-angle-down')
        this.inputIconNode.removeEventListener('click', this.clearEvent)
      }
    }

    clearEvent = (e) => {
      e.target.classList.remove('icon-close-circle')
      e.target.classList.add('icon-angle-down')
      // 重置option
      if (this.states.multi) {
        this.states.value = []
        this.states.text = []
        this.inputNode.value = ''
        Array.from(this.optionNode.children).forEach((item) => {
          item.classList.remove('hide')
        })
      } else {
        this.states.value = ''
        this.states.text = ''
        this.inputNode.value = ''
        Array.from(this.optionNode.children).forEach((item) => {
          item.classList.remove('active')
        })
      }
      this.emit('onChange', this.states.value)
    }

    overflow = (isOverflow) => {
      this.optionNode.classList.toggle('overflow', isOverflow)
    }

    option = (value) => {
      value.forEach((item) => {
        const li = document.createElement('LI')
        li.innerText = item.label
        li.setAttribute('data-value', item.value)
        if (item.disabled) {
          li.className = 'disabled'
        }
        this.node.lastElementChild.appendChild(li)
      })
    }

    visible = (value) => {
      this.optionNode.classList.toggle('transition-enter', value)
      this.optionNode.classList.toggle('transition-leave', !value)
    }

    disabled = (isDisabled) => {
      this.inputNode.parentNode.classList.toggle('disabled', isDisabled)
      this.inputNode.setAttribute('readonly', isDisabled)
    }

    size = (size) => {
      this.node.classList.remove('small', 'large')
      this.node.classList.add(size)
    }

    onSelect = (value, text) => {
      if (this.states.multi) {
        this.states.value.push(value)
        this.states.text.push(text)
        this.inputNode.value = this.states.text.join(',')
      } else {
        this.states.value = value
        this.states.text = text
        this.inputNode.value = this.states.text
      }
      this.emit('onChange', this.states.value)
    }
}
