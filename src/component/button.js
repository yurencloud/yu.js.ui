import YuComponent from '../util/component'

export default class YuButton extends YuComponent {
  constructor(component, states) {
    super()
    this.init(component, states)
  }

    type = (type) => {
      this.node.classList.remove('primary', 'danger', 'warning', 'info', 'success')
      this.node.classList.add(type)
    }

    text = (text) => {
      this.node.innerText = text
    }

    disabled = (isDisabled) => {
      this.node.classList.toggle('disabled', isDisabled)
    }

    plain = (isPlain) => {
      this.node.classList.toggle('plain', isPlain)
    }

    size = (size) => {
      this.node.classList.remove('small', 'large')
      this.node.classList.add(size)
    }

    circle = (isCircle) => {
      this.node.classList.toggle('circle', isCircle)
    }

    icon = (iconfontName) => {
      const i = document.createElement('I')
      i.className = `iconfont ${iconfontName}`
      this.node.insertBefore(i, this.node.firstChild)
    }
}
