import YuComponent from '../util/component'

export default class YuInput extends YuComponent {
    defaultStates = {
      value: '',
      clearable: true,
    }

    constructor(component, states) {
      super()
      this.initNode(component)
      if (this.node.classList.contains('textarea')) {
        this.inputNode = this.node.querySelector('textarea')
      } else {
        this.inputNode = this.node.querySelector('input')
      }
      this.initStates(states)
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
    }

    prefix = (prefixIcon) => {
      const span = document.createElement('SPAN')
      span.className = 'prefix icon'
      const i = document.createElement('I')
      i.className = `iconfont ${prefixIcon}`
      span.appendChild(i)
      this.node.insertBefore(span, this.inputNode)
      this.inputNode.classList.add('prefix')
    }

    suffix = (suffixIcon) => {
      const span = document.createElement('SPAN')
      span.className = 'suffix icon'
      const i = document.createElement('I')
      i.className = `iconfont ${suffixIcon}`
      span.appendChild(i)
      this.node.appendChild(span, this.inputNode)
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

    clearable = (clearable) => {
      this.states.clear = clearable
      let clearNode = this.node.querySelector('span.clearable')
      if (!clearNode) {
        clearNode = YuInput.createClearNode()
        this.node.appendChild(clearNode)
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
      span.className = 'clearable'
      const i = document.createElement('I')
      i.className = 'iconfont icon-close-circle'
      span.appendChild(i)
      return span
    }
}
