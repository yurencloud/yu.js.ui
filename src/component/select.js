import classnames from 'classnames'
import YuComponent from '../util/component'

export default class YuSelect extends YuComponent {
  constructor(component, states) {
    super()
    this.initNode(component)
    this.inputNode = this.node.querySelector('input')
    this.optionNode = this.node.querySelector('.yu-option')

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

    this.states.value = ''
    this.states.text = ''

    this.states.multi = states && states.multi
    if (this.states.multi) {
      this.states.value = []
      this.states.text = []
      delete states.multi
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
      if (this.states.multi) {
        e.target.classList.add('hide')
      } else {
        Array.from(e.target.parentNode.children).forEach((item) => {
          item.classList.remove('active')
        })
        e.target.classList.add('active')
      }
    })

    this.initStates(states)
  }

    clear = (value) => {
      if (value) {
        this.inputNode.nextElementSibling.children[0].classList = 'iconfont icon-close-circle'
        this.node.querySelector('.icon-close-circle').addEventListener('click', (e) => {
          e.target.className = 'iconfont icon-angle-down'
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
      if (this.states.multi) {
        this.states.value.push(value)
        this.states.text.push(text)
        this.inputNode.value = this.states.text.join(',')
      } else {
        this.states.value = value
        this.states.text = text
        this.inputNode.value = this.states.text
      }
    }
}
