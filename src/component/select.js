import YuComponent from '../util/component'

export default class YuSelect extends YuComponent {
  defaultStates = {
    option: [],
    value: '',
    text: '',
  }

  constructor(component, states) {
    super()
    this.initNode(component)
    this.inputNode = this.node.querySelector('input')
    this.optionNode = this.node.querySelector('.yu-option')
    if (this.states.multi) {
      this.states.value = []
      this.states.text = []
    }
    this.inputIconNode = this.node.querySelector('.suffix>i')
    this.initStates(states)

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
    Array.from(this.optionNode.children).forEach((item) => {
      item.addEventListener('mousedown', (e) => {
        // 如果选项无值，则不允许选择，那么此项就可以做为标题之类的
        if (!e.currentTarget.getAttribute('data-value')) return
        this.onSelect(e.currentTarget.getAttribute('data-value'), e.target.innerText)
        if (this.states.multi) {
          e.currentTarget.classList.add('hide')
        } else {
          Array.from(this.optionNode.querySelectorAll('.active')).forEach((activeItem) => {
            activeItem.classList.remove('active')
          })
          e.currentTarget.classList.add('active')
        }
      })
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

    option = (option) => {
      option.forEach((item) => {
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

    showSelect = (isShowSelect) => {
      if(isShowSelect){

      }else{

      }
    }

    onSelect = (value, text) => {
      if (this.states.multi) {
        this.states.value.push(value)
        this.states.text.push(text)
        this.inputNode.value = this.states.text.join(',')
        this.showSelect(this.states.showSelect)
      } else {
        this.states.value = value
        this.states.text = text
        this.inputNode.value = this.states.text
      }
      this.emit('onChange', this.states.value)
    }
}
