import YuButton from '../../src/component/button'

// const props = {
//   content(value) {
//     yuAlert.setState('text', value)
//     yuButton.setState('text', value)
//   },
//   setProp(stateName, value) {
//     this[stateName].call(this, value)
//   },
// }


const yuButton = new YuButton('button', {
  type: 'primary', plain: true, circle: true, text: '必',
})

document.getElementById('buttonInput').addEventListener('blur', (e) => {
  yuButton.setState('type', e.target.value)
  // props.setProp('content', e.target.value)
})