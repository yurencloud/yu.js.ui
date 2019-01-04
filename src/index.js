import YuButton from './component/button'
import YuRadio from './component/radio'
import YuCheckbox from './component/checkbox'
import YuInput from './component/input'
import YuCounter from './component/counter'
import YuCounterSide from './component/counter-side'
import YuSelect from './component/select'
import YuInit from './util/init'
import YuComponent from './util/component'

const YU = {
  Button: YuButton,
  Radio: YuRadio,
  Checkbox: YuCheckbox,
  Input: YuInput,
  Counter: YuCounter,
  CounterSide: YuCounterSide,
  Select: YuSelect,

  // 非组件
  Component: YuComponent,
  Init: YuInit,
  Data: {},
}

export default YU
