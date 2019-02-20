import { Component } from '../../../src/index'

export default class CardList extends Component {
  constructor(component, states) {
    super()
    this.initNode(component)
    this.titleNode = this.node.querySelector('.title')
    this.bodyNode = this.node.querySelector('ul.body')
    this.initStates(states)

    this.bodyNode.addEventListener('click', (e) => {
      e.target.classList.add('active')
      this.emit('onChange', e.target.innerText)
    })
  }

  title = (title) => {
    this.titleNode.innerText = title
  }

  option = (option) => {
    if (option.length > 0) {
      this.bodyNode.innerHTML = ''
      option.forEach((item) => {
        this.bodyNode.appendChild(this.createOption(item))
      })
    }
  }

 createOption = (option) => {
   const li = document.createElement('LI')
   if (option.active) {
     li.className = 'active'
   }
   li.innerText = option.label
   return li
 }
}
