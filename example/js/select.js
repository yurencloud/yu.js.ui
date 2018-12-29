import YuSelect from '../../src/component/select'

// const props = {
//   content(value) {
//     yuAlert.setState('text', value)
//     yuButton.setState('text', value)
//   },
//   setProp(stateName, value) {
//     this[stateName].call(this, value)
//   },
// }


const yuSelect = new YuSelect('select', {
  option: [
    { value: 'cat', label: '猫' },
    { value: 'dog', label: '狗' },
    { value: 'pig', label: '猪' },
  ],
})

document.getElementById('buttonInput').addEventListener('blur', (e) => {
  yuSelect.setState('type', e.target.value)
  // props.setProp('content', e.target.value)
})
