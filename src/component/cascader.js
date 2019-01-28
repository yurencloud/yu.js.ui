import YuComponent from '../util/component'

export default class YuButton extends YuComponent {
  // 如何初始化有状态先后顺序，则设置defaultStates, defaultStates的排序优先级最高
  defaultStates = {
    'change-on-select': false,
    hover: false,
    remote: null,
    option: [],
    value: [],
  }

  constructor(component, states) {
    super()
    this.initNode(component)
    this.inputNode = this.node.querySelector('input')
    this.inputIconNode = this.node.querySelector('.suffix>i')
    this.cascaderOptionNode = this.node.querySelector('.yu-cascader-option')

    this.inputNode.addEventListener('focus', () => {
      this.setState('visible', !this.states.disabled)
    })
    this.inputNode.addEventListener('blur', (e) => {
      this.setState('clear', e.target.value.length > 0)
    })
    document.body.addEventListener('click', (e) => {
      if (e.currentTarget.tagName === 'BODY'
            && e.target.tagName !== 'INPUT'
            && e.target.tagName !== 'LI'
      ) {
        this.setState('visible', false)
      }
    }, false)
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
      this.states.value = []
      this.states.text = []
      this.inputNode.value = ''
      this.cascaderOptionNode.innerHTML = ''
      this.setState('option', this.states.option)
      this.emit('onChange', this.states.value)
    }

    overflow = (isOverflow) => {
      this.cascaderOptionNode.classList.toggle('overflow', isOverflow)
    }

    option = (option) => {
      if (this.states.remote) {
        this.states.remote().then((data) => {
          this.insertOption([], data)
        })
      } else {
        this.insertOption([], option)
      }
    }

    // 生成新选项
    // @param {Array} multiIndex - 多级索引，[2,3,1,...]，可定位到每一个选项
    createOption = (multiIndex) => {
      this.removeChildOption(multiIndex.length - 1)
      let option = []
      if (this.states.remote) {
        this.states.value = []
        Array.from(this.cascaderOptionNode.querySelectorAll('.active')).forEach((item) => {
          this.states.value.push(item.getAttribute('data-value'))
        })
        this.states.remote(this.states.value).then((data) => {
          this.insertOption(multiIndex, data)
        })
      } else {
        option = this.getTargetOption(multiIndex)
        this.insertOption(multiIndex, option)
      }
    }

    value = (value) => {
      const multiIndex = []
      let option = this.states.option
      const text = []
      value.forEach((item) => {
        for (let i = 0; i < option.length; i++) {
          if (option[i].value === item) {
            text.push(option[i].label)
            option = option[i].children
            multiIndex.push(i)
            if (option && option.length > 0) {
              this.insertOption(multiIndex, option)
            }
            return
          }
        }
      })
      this.onSelect({ value, text })
    }

    // 插入新选项
    insertOption = (multiIndex, option) => {
      const ul = document.createElement('UL')
      ul.className = 'yu-option'
      option.forEach((item, index) => {
        const li = document.createElement('LI')
        li.innerText = item.label
        li.setAttribute('data-value', item.value)
        li.setAttribute('data-index', [...multiIndex, index].join(','))
        if (item.disabled) {
          li.classList.add('disabled')
        }
        if (item.hide) {
          li.classList.add('hide')
        }
        if (this.states.value.length > 0 && this.states.value[multiIndex.length] === item.value) {
          li.classList.add('active')
        }

        if (!item.children) {
          li.classList.add('last')
          if (this.states.hover) {
            li.addEventListener('click', (e) => {
              this.setState('visible', false)
              this.onSelect(this.getTargetOptionValueAndText(e.currentTarget.getAttribute('data-index').split(',')))
            })
          }
        }
        ul.appendChild(li)
      })

      if (this.states.hover) {
        ul.addEventListener('mouseover', (e) => {
          if (e.target.tagName !== 'LI') return
          if (e.target.classList.contains('disabled')) return
          Array.from(e.currentTarget.children).forEach((item) => {
            item.classList.remove('active')
          })
          e.target.classList.add('active')
          const dataIndex = e.target.getAttribute('data-index').split(',')
          if (e.target.classList.contains('last')) {
            return
          }
          this.createOption(dataIndex)
        })
      } else {
        ul.addEventListener('mousedown', (e) => {
          if (e.target.classList.contains('disabled')) return
          Array.from(e.currentTarget.children).forEach((item) => {
            item.classList.remove('active')
          })
          e.target.classList.add('active')
          const dataIndex = e.target.getAttribute('data-index').split(',')

          if (e.target.classList.contains('last')) {
            this.setState('visible', false)
            this.onSelect(this.getTargetOptionValueAndText(dataIndex))
            return
          }

          if (this.states['change-on-select']) {
            this.onSelect(this.getTargetOptionValueAndText(dataIndex))
          }

          this.createOption(dataIndex)
        })
      }


      this.cascaderOptionNode.appendChild(ul)
    }

    // 删除后面节点
    removeChildOption(start) {
      Array.from(this.cascaderOptionNode.children).forEach((item, index) => {
        if (index > start) {
          this.cascaderOptionNode.removeChild(item)
        }
      })
    }

    getTargetOption(multiIndex) {
      let { option } = this.states
      for (let i = 0; i < multiIndex.length; i++) {
        option = option[multiIndex[i]].children
      }
      return option
    }

    getRemoteOptionItem(multiIndex) {
      const { remoteOption } = this.states
      return remoteOption[multiIndex[multiIndex.length - 1]]
    }

    getTargetOptionValueAndText(multiIndex) {
      let { option } = this.states
      const result = { value: [], text: [] }
      for (let i = 0; i < multiIndex.length; i++) {
        const opt = option[multiIndex[i]]
        option = opt.children
        result.value.push(opt.value)
        result.text.push(opt.label)
      }
      return result
    }

    visible = (value) => {
      this.cascaderOptionNode.classList.toggle('transition-enter', value)
      this.cascaderOptionNode.classList.toggle('transition-leave', !value)
    }

    disabled = (isDisabled) => {
      this.inputNode.parentNode.classList.toggle('disabled', isDisabled)
      this.inputNode.setAttribute('readonly', isDisabled)
    }

    onSelect = (result) => {
      const { value, text } = result
      this.states.value = value
      this.states.text = text
      if (this.states.short) {
        this.inputNode.value = this.states.text[this.states.text.length - 1]
      } else {
        this.inputNode.value = this.states.text.join('/')
      }

      this.setState('clear', true)
      this.emit('onChange', this.states.value)
    }
}
