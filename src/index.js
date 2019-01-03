import YuButton from './component/button'
import YuRadio from './component/radio'
import YuCheckbox from './component/checkbox'
import YuInput from './component/input'
import YuCounter from './component/counter'
import YuSelect from './component/select'
import YuInit from './util/init'
import YuComponent from './util/component'

const YU = {
  Button: YuButton,
  Radio: YuRadio,
  Checkbox: YuCheckbox,
  Input: YuInput,
  Counter: YuCounter,
  Select: YuSelect,

  // 非组件
  Component: YuComponent,
  Init: YuInit,
  Props: {},
}

export default YU
