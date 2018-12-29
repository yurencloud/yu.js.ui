export default class YuButton {
  constructor(value) {
    this.node = document.getElementById(value)
  }

  type(value) {
    this.node.className = `yu-button ${value}`
  }

  text(value) {
    this.node.innerText = value
  }

  setState(stateName, value) {
    this[stateName].call(this, value)
  }
}
