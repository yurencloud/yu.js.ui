import YuComponent from '../util/component'

export default class YuButton extends YuComponent {
  constructor(component, states) {
    super()
    this.initNode(component)
    this.inputNode = this.node.querySelector('input')
    this.inputIconNode = this.node.querySelector('.suffix>i')
    this.cascaderOptionNode = this.node.querySelector('.yu-cascader-option')

    if (!this.states.activeOption) {
      this.states.activeOption = []
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

    this.initStates(states)
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
        Array.from(this.cascaderOptionNode.children).forEach((item) => {
          item.classList.remove('hide')
        })
      } else {
        this.states.value = ''
        this.states.text = ''
        this.inputNode.value = ''
        Array.from(this.cascaderOptionNode.children).forEach((item) => {
          item.classList.remove('active')
        })
      }
      this.emit('onChange', this.states.value)
    }

    overflow = (isOverflow) => {
      this.cascaderOptionNode.classList.toggle('overflow', isOverflow)
    }

    // activeOption []

    option = (value) => {
      const ul = document.createElement('UL')
      ul.className = 'yu-option'
      value.forEach((item, index) => {
        const li = document.createElement('LI')
        li.innerText = item.label
        li.setAttribute('data-value', item.value)
        li.setAttribute('data-index', index)
        if (item.disabled) {
          li.className = 'disabled'
        }
        ul.appendChild(li)
      })
      ul.addEventListener('mousedown', (e) => {
        e.preventDefault()
        console.log(e)
        console.log(e.currentTarget)
        this.renderOption([e.target.getAttribute('data-index')])
      })
      this.cascaderOptionNode.appendChild(ul)
    }

    // multiIndex = [3, 2, 3]
    renderOption = (multiIndex) => {
      // 先清空后面的level
      // console.log(this.cascaderOptionNode.children)
      // Array.from(this.cascaderOptionNode.children).forEach((item, index) => {
      //   if (index > multiIndex.length - 1) {
      //     this.cascaderOptionNode.removeChild(item)
      //   }
      // })
      const option = this.getTargetOption(multiIndex)
      const ul = document.createElement('UL')
      ul.className = 'yu-option'
      option.forEach((item, index) => {
        const li = document.createElement('LI')
        li.innerText = item.label
        li.setAttribute('data-value', item.value)
        li.setAttribute('data-index', `${multiIndex.join(',')},${index}`)
        if (item.disabled) {
          li.className = 'disabled'
        }
        ul.appendChild(li)
      })
      this.cascaderOptionNode.appendChild(ul)
    }

    getTargetOption(multiIndex) {
      let option = this.states.option
      console.log(option)
      console.log(multiIndex)
      for (let i = 0; i < multiIndex.length; i++) {
        option = option[multiIndex[i]].children
      }
      return option
    }

    visible = (value) => {
      this.cascaderOptionNode.classList.toggle('transition-enter', value)
      this.cascaderOptionNode.classList.toggle('transition-leave', !value)
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
