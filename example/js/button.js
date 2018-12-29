import YuButton from '../../src/component/button'

// yuButton = new Yu.Button('button')
// 选择器只有id和class，均只取第一个元素。
// const yuAlert = {
//   node: document.getElementById('alert'),
//   text(value) {
//     this.node.innerText = value
//   },
//   setState(stateName, value) {
//     this[stateName].call(this, value)
//   },
// }

const yuButton = new YuButton('button')

// const props = {
//   content(value) {
//     yuAlert.setState('text', value)
//     yuButton.setState('text', value)
//   },
//   setProp(stateName, value) {
//     this[stateName].call(this, value)
//   },
// }

const say = () => {
  console.log(1)
}

say()

document.getElementById('buttonInput').addEventListener('blur', (e) => {
  yuButton.setState('type', e.target.value)
  // props.setProp('content', e.target.value)
})
