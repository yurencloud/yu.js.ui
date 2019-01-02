export default class YuInput {
  constructor(value, props) {
    this.node = document.querySelector(value)
    const isTextarea = this.node.classList.contains('textarea')
    if (isTextarea) {
      this.inputNode = this.node.querySelector('textarea')
    } else {
      this.inputNode = this.node.querySelector('input')
    }

    this.value = ''
    this.clear = false

    if (props) {
      for (const key of Object.keys(props)) {
        this.setState(key, props[key])
      }
    }

    this.inputNode.addEventListener('change', (e) => {
      this.value = e.target.value
    })
    this.inputNode.addEventListener('input', (e) => {
      this.value = e.target.value
      console.log(this.value)
      if (this.clear) {
        this.showClear(this.value.length > 0)
      }
    })
  }

  defaultValue = (value) => {
    this.inputNode.value = value
    this.value = value
    if (this.clear) {
      this.showClear(this.value.length > 0)
    }
  }

  disabled = (value) => {
    this.node.classList.toggle('disabled', value)
  }

  clearable = (value) => {
    this.clear = value
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
        this.value = ''
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

  setState(stateName, value) {
    this[stateName](value)
  }

  setProps(props) {
    for (const key of Object.keys(props)) {
      this.setState(key, props[key])
    }
  }
}
