import YuComponent from '../util/component'

export default class YuInput extends YuComponent {
    defaultStates = {
      value: '',
    }

    constructor(component, states) {
      super()
      this.initNode(component)
      if (this.node.classList.contains('textarea')) {
        this.inputNode = this.node.querySelector('textarea')
      } else {
        this.inputNode = this.node.querySelector('input')
      }

      this.optionNode = this.node.querySelector('.yu-option')

      this.initStates(states)

      this.optionBindEvent()

      this.clearNode = this.node.querySelector('span.clearable')
      this.inputNode.addEventListener('change', (e) => {
        this.states.value = e.target.value
        this.emit('onChange', this.states.value)
      })

      this.inputNode.addEventListener('input', (e) => {
        this.states.value = e.target.value
        this.emit('onInput', this.states.value)
        if (this.states.clearable) {
          this.showClear(this.states.value.length > 0)
        }
      })

      this.inputNode.addEventListener('focus', () => {
        if (this.states.option) {
          this.setState('visible', !this.states.disabled)
        }
        this.emit('onFocus', this.states.value)
      })
      this.inputNode.addEventListener('blur', () => {
        if (this.states.option) {
          this.setState('visible', false)
        }
        this.emit('onBlur', this.states.value)
      })
    }

    optionBindEvent() {
      if (this.optionNode) {
        Array.from(this.optionNode.children).forEach((item) => {
          item.addEventListener('mousedown', (e) => {
            if (e.currentTarget.classList.contains('disabled')) return
            Array.from(this.optionNode.querySelectorAll('.active')).forEach((activeItem) => {
              activeItem.classList.remove('active')
            })
            e.currentTarget.classList.add('active')
            this.states.value = e.target.innerText
            this.inputNode.value = e.target.innerText
            this.emit('onChange', this.states.value)
          })
        })
      }
    }

    visible = (value) => {
      this.optionNode.classList.toggle('transition-enter', value)
      this.optionNode.classList.toggle('transition-leave', !value)
    }

    option = (option) => {
      if (option.length > 0) {
        this.optionNode.innerHTML = ''
        option.forEach((item) => {
          const li = document.createElement('LI')
          li.innerText = item.label
          if (item.disabled) {
            li.className = 'disabled'
          }
          this.optionNode.appendChild(li)
        })
        // 避免重复绑定
        if (this.mounted) {
          this.optionBindEvent()
        }
      }
    }


    prefix = (prefixIcon) => {
      const prefixNode = this.node.querySelector('span.prefix')
      if (prefixNode) {
        prefixNode.firstElementChild.className = `iconfont ${prefixIcon}`
      } else {
        const span = document.createElement('SPAN')
        span.className = 'prefix icon'
        const i = document.createElement('I')
        i.className = `iconfont ${prefixIcon}`
        span.appendChild(i)
        this.node.insertBefore(span, this.inputNode)
      }
      this.inputNode.classList.add('prefix')
    }

    suffix = (suffixIcon) => {
      const suffixNode = this.node.querySelector('span.suffix')
      if (suffixNode) {
        suffixNode.firstElementChild.className = `iconfont ${suffixIcon}`
      } else {
        const span = document.createElement('SPAN')
        span.className = 'suffix icon'
        const i = document.createElement('I')
        i.className = `iconfont ${suffixIcon}`
        span.appendChild(i)
        this.node.appendChild(span, this.inputNode)
      }

      this.inputNode.classList.add('suffix')
    }

    size = (size) => {
      this.inputNode.classList.remove('small', 'large')
      this.inputNode.classList.add(size)
    }

    full = (isFullWidth) => {
      this.inputNode.classList.toggle('full', isFullWidth)
    }

    value = (value) => {
      this.inputNode.value = value
      this.states.value = value
    }

    disabled = (isDisabled) => {
      this.node.classList.toggle('disabled', isDisabled)
      this.inputNode.setAttribute('disabled', isDisabled)
    }

    width = (width) => {
      this.inputNode.style.width = width
    }

    clearable = (clearable) => {
      this.states.clear = clearable
      let clearNode = this.node.querySelector('span.clearable')
      if (!clearNode) {
        // 有清除功能，就放弃后置图标
        const suffixNode = this.node.querySelector('span.suffix')
        if (suffixNode) {
          suffixNode.firstElementChild.className = 'iconfont icon-close-circle'
        } else {
          clearNode = YuInput.createClearNode()
          this.node.appendChild(clearNode)
        }
      }
      clearNode.firstElementChild.addEventListener('click', this.clearEvent)
      clearNode.style.display = this.states.value.length > 0 ? 'inline-block' : 'none'
    }

    clearEvent = () => {
      this.inputNode.value = ''
      this.states.value = ''
      this.emit('onChange', this.states.value)
      this.emit('onClear')
      this.showClear(false)
    }

    showClear = (isShowClear) => {
      this.clearNode.style.display = isShowClear ? 'inline-block' : 'none'
    }

    static createClearNode() {
      const span = document.createElement('SPAN')
      span.className = 'suffix clearable'
      const i = document.createElement('I')
      i.className = 'iconfont icon-close-circle'
      span.appendChild(i)
      return span
    }
}
