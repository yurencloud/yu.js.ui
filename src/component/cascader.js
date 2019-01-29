import YuComponent from '../util/component'

export default class YuCascader extends YuComponent {
  // 如果初始化有状态先后顺序，则设置defaultStates, defaultStates的排序优先级最高
  defaultStates = {
    'change-on-select': false,
    hover: false,
    remote: null,
    option: [],
    value: [],
  }

  constructor(component, states) {
    super()
    this.init(component, states)
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
  }

    visible = (value) => {
      this.cascaderOptionNode.classList.toggle('transition-enter', value)
      this.cascaderOptionNode.classList.toggle('transition-leave', !value)
    }

    disabled = (isDisabled) => {
      this.inputNode.parentNode.classList.toggle('disabled', isDisabled)
      this.inputNode.setAttribute('readonly', isDisabled)
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

    value = (value) => {
      if (value.length === 0) return
      const multiIndex = []
      let { option } = this.states
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


    // 生成新选项
    // @param {Array} multiIndex - 多级索引，[2,3,1,...]，可定位到每一个选项
    createOption = (multiIndex) => {
      this.removeChildOption(multiIndex.length - 1)
      let option = []
      if (this.states.remote) {
        this.states.value = this.getValueAndText().value
        this.states.remote(this.states.value).then((data) => {
          this.insertOption(multiIndex, data)
        })
      } else {
        option = this.getTargetOption(multiIndex)
        this.insertOption(multiIndex, option)
      }
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
              this.onSelect(this.getValueAndText(e.currentTarget.getAttribute('data-index').split(',')))
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
          if (e.target.tagName !== 'LI') return
          if (e.target.classList.contains('disabled')) return
          Array.from(e.currentTarget.children).forEach((item) => {
            item.classList.remove('active')
          })
          e.target.classList.add('active')
          const dataIndex = e.target.getAttribute('data-index').split(',')

          if (e.target.classList.contains('last')) {
            this.setState('visible', false)
            this.onSelect(this.getValueAndText())
            return
          }

          if (this.states['change-on-select']) {
            this.onSelect(this.getValueAndText())
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

    getValueAndText() {
      const result = { value: [], text: [] }
      Array.from(this.cascaderOptionNode.querySelectorAll('.active')).forEach((item) => {
        result.value.push(item.getAttribute('data-value'))
        result.text.push(item.innerText)
      })
      return result
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
