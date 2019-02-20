import { Component } from '../../../src/index'
import ClipboardJS from 'clipboard'

export default class Code extends Component {
  constructor(component, states) {
    super()
    this.initNode(component)
    this.node.innerHTML = '<div class="view-code"><span>查看代码</span><a class="clipboard" data-clipboard-text="">复制</a><i class="iconfont icon-angle-right"></i></div><div class="code-content"><pre><code class="html"></code></pre></div>'
    this.viewCodeNode = this.node.firstElementChild
    this.clipboardNode = this.viewCodeNode.querySelector('.clipboard')
    this.codeNode = this.node.getElementsByTagName('CODE')[0]

    this.viewCodeNode.addEventListener('click', (e) => {
      if (e.target.nodeName === 'A') {
        return
      }
      if (e.currentTarget.parentNode.classList.contains('active')) {
        e.currentTarget.parentNode.classList.remove('active')
        e.currentTarget.firstElementChild.innerText = '查看代码'
      } else {
        e.currentTarget.parentNode.classList.add('active')
        e.currentTarget.firstElementChild.innerText = '收起代码'
      }
    })
    // 初始化组件状态
    this.initStates(states)
    this.clipboardNode.setAttribute('data-clipboard-text', this.states.code)
    const clipboard = new ClipboardJS('.clipboard')
    clipboard.on('success', () => {
      console.log('复制成功')
    })
    clipboard.on('error', () => {
      console.log('复制失败')
    })
  }

  active = (active) => {
    if (active) {
      this.node.classList.toggle('active', active)
      this.viewCodeNode.firstElementChild.innerText = '收起代码'
    } else {
      this.node.classList.toggle('active', active)
      this.viewCodeNode.firstElementChild.innerText = '查看代码'
    }
  }

  code = (code) => {
    this.codeNode.innerText = code
  }

  language = (language) => {
    this.codeNode.className = language
  }
}
