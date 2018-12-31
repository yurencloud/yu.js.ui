import classnames from 'classnames'

export default class YuSelect {
  constructor(value, props) {
    this.node = document.querySelector(value)
    if (!this.node) {
      return
    }
    // eslint-disable-next-line prefer-destructuring
    this.inputNode = this.node.getElementsByTagName('INPUT')[0]
    this.optionNode = this.node.lastElementChild

    this.className = {
      'yu-button': true,
      disabled: false,
      plain: false,
      circle: false,
    }

    this.optionClassName = {
      'yu-option': true,
      'zoom-in-top-enter': true,
      overflow: false,
      'zoom-in-top-enter-active': false,
      'zoom-in-top-leave-active': false,
    }

    this.value = ''
    this.text = ''

    this.multi = props && props.multi
    if (this.multi) {
      this.value = []
      this.text = []
      delete props.multi
    }
    for (const key in props) {
      this.setState(key, props[key])
    }

    this.node.lastElementChild.className = classnames(this.optionClassName)

    this.inputNode.addEventListener('focus', () => {
      this.setState('visible', true)
    })
    this.inputNode.addEventListener('blur', (e) => {
      this.setState('visible', false)
      this.setState('clear', e.target.value.length > 0)
    })
    this.inputNode.addEventListener('input', (e) => {
      this.setState('clear', e.target.value.length > 0)
    })
    this.node.lastElementChild.addEventListener('mousedown', (e) => {
      this.onSelect(e.target.getAttribute('data-value'), e.target.innerText)
      if (this.multi) {
        e.target.classList.add('hide')
      } else {
        Array.from(e.target.parentNode.children).forEach((item) => {
          item.classList.remove('active')
        })
        e.target.classList.add('active')
      }
    })
  }

  clear = (value) => {
    if (value) {
      this.inputNode.nextElementSibling.children[0].classList = 'iconfont icon-close-circle'
      this.node.querySelector('.icon-close-circle').addEventListener('click', (e) => {
        e.target.className = 'iconfont icon-angle-down'
        // 重置option
        if (this.multi) {
          this.value = []
          this.text = []
          this.inputNode.value = ''
          Array.from(this.optionNode.children).forEach((item) => {
            item.classList.remove('hide')
          })
        } else {
          this.value = ''
          this.text = ''
          this.inputNode.value = ''
          Array.from(this.optionNode.children).forEach((item) => {
            item.classList.remove('active')
          })
        }
      })
    } else {
      this.inputNode.nextElementSibling.children[0].classList = 'iconfont icon-angle-down'
    }
  }

  overflow = (value) => {
    this.optionClassName.overflow = value
    this.node.lastElementChild.className = classnames(this.optionClassName)
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
    this.optionClassName['zoom-in-top-enter'] = false
    this.optionClassName['zoom-in-top-enter-active'] = value
    this.optionClassName['zoom-in-top-leave-active'] = !value
    this.optionNode.className = classnames(this.optionClassName)
  }

  disabled = (value) => {
    this.className.disabled = value
    this.node.className = classnames(this.className)
  }

  size = (value) => {
    Object.assign(this.className, { small: false, large: false }, { [value]: true })
    this.node.className = classnames(this.className)
  }

    onSelect = (value, text) => {
      if (this.multi) {
        this.value.push(value)
        this.text.push(text)
        this.inputNode.value = this.text.join(',')
      } else {
        this.value = value
        this.text = text
        this.inputNode.value = this.text
      }
    }

    setState(stateName, value) {
      this[stateName](value)
    }
}
