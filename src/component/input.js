import YuComponent from '../util/component'

export default class YuInput extends YuComponent {
  constructor(component, states) {
    super()
    this.initNode(component)
    if (this.node.classList.contains('textarea')) {
      this.inputNode = this.node.querySelector('textarea')
    } else {
      this.inputNode = this.node.querySelector('input')
    }

    this.states.value = ''
    this.states.clear = false


    this.inputNode.addEventListener('change', (e) => {
      this.states.value = e.target.value
      this.emit('onChange', this.states.value)
    })

    this.inputNode.addEventListener('input', (e) => {
      this.states.value = e.target.value
      this.emit('onInput', this.states.value)
      if (this.states.clear) {
        this.showClear(this.states.value.length > 0)
      }
    })

    this.initStates(states)
  }

    value = (value) => {
      this.inputNode.value = value
      this.states.value = value
      if (this.states.clear) {
        this.showClear(this.states.value.length > 0)
      }
    }

    disabled = (isDisabled) => {
      this.node.classList.toggle('disabled', isDisabled)
    }

    clearable = (clearable) => {
      this.states.clear = clearable
    }

    showClear = (isShowClear) => {
      let clearNode = this.node.querySelector('span.clearable')
      if (!clearNode) {
        const span = document.createElement('SPAN')
        span.className = 'clearable'
        const i = document.createElement('I')
        i.className = 'iconfont icon-close-circle'
        span.appendChild(i)
        this.node.appendChild(span)
        i.addEventListener('click', (e) => {
          this.inputNode.value = ''
          this.states.value = ''
          const parent = e.target.parentNode
          this.emit('onChange', this.states.value)
          this.emit('onClear')
          parent.parentNode.removeChild(parent)
        })

        clearNode = span
      }

      clearNode.style.display = isShowClear ? 'inline-block' : 'none'
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
}
