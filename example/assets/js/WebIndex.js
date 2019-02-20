import { Component } from '../../../src/index'

export default class WebIndex extends Component {
  constructor(component, states) {
    super()
    this.init(component, states)
    const temp = window.location.pathname.split('/')[1]
    if (temp) {
      const currentKey = temp.substr(0, temp.length - 5)
      this.node.querySelector(`li[data-key=${currentKey}]`).classList.add('active')
    }
  }

  option = (option) => {
    if (option.length > 0) {
      this.node.innerHTML = ''
      option.forEach((item) => {
        this.node.appendChild(this.createOption(item))
      })
    }
  }

 createOption = (option) => {
   const li = document.createElement('LI')
   li.setAttribute('data-key', option.key)
   const a = document.createElement('A')
   a.innerText = option.label
   a.href = option.href
   li.appendChild(a)
   return li
 }
}
