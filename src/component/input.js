import YuComponent from '../util/component'

export default class YuInput extends YuComponent {
  constructor(component, states) {
    super()
    this.node = this.getNode(component)
    if (this.node.classList.contains('textarea')) {
      this.inputNode = this.node.querySelector('textarea')
    } else {
      this.inputNode = this.node.querySelector('input')
    }

    this.states.value = ''
    this.states.clear = false

    this.setStates(states)

    this.inputNode.addEventListener('change', (e) => {
      this.states.component = e.target.value
    })

    this.inputNode.addEventListener('input', (e) => {
      this.states.component = e.target.value
      console.log(this.states.value)
      if (this.states.clear) {
        this.showClear(this.states.value.length > 0)
      }
    })
  }

    value = (value) => {
      this.inputNode.value = value
      this.states.value = value
      if (this.states.clear) {
        this.showClear(this.states.value.length > 0)
      }
    }

    disabled = (value) => {
      this.node.classList.toggle('disabled', value)
    }

    clearable = (value) => {
      this.states.clear = value
    }

    showClear = (value) => {
      let clearNode = this.node.querySelector('span.clearable')
      if (!clearNode) {
        const span = document.createElement('SPAN')
        span.className = 'clearable'
        const i = document.createElement('I')
        i.className = 'iconfont icon-close-circle'
        span.appendChild(i)
        this.node.appendChild(span)
        i.addEventListener('click', (e) => {
          console.log(2)
          this.inputNode.value = ''
          this.states.value = ''
          const parent = e.target.parentNode
          parent.parentNode.removeChild(parent)
        })

        clearNode = span
      }

      clearNode.style.display = value ? 'inline-block' : 'none'
    }

    prefix = (value) => {
      const span = document.createElement('SPAN')
      span.className = 'prefix icon'
      const i = document.createElement('I')
      i.className = `iconfont ${value}`
      span.appendChild(i)
      this.node.insertBefore(span, this.inputNode)
      this.inputNode.classList.add('prefix')
    }

    suffix = (value) => {
      const span = document.createElement('SPAN')
      span.className = 'suffix icon'
      const i = document.createElement('I')
      i.className = `iconfont ${value}`
      span.appendChild(i)
      this.node.appendChild(span, this.inputNode)
      this.inputNode.classList.add('suffix')
    }

    size = (value) => {
      this.inputNode.classList.remove('small', 'large')
      this.inputNode.classList.add(value)
    }

    full = (value) => {
      this.inputNode.classList.toggle('full', value)
    }
}
