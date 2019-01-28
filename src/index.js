import YuInit from './util/init'
import YuComponent from './util/component'

import YuButton from './component/button'
import YuRadio from './component/radio'
import YuCheckbox from './component/checkbox'
import YuInput from './component/input'
import YuCounter from './component/counter'
import YuCounterSide from './component/counter-side'
import YuSelect from './component/select'
import YuCascader from './component/cascader'
import YuSwitch from './component/switch'

const yu = {
  Button: YuButton,
  Radio: YuRadio,
  Checkbox: YuCheckbox,
  Input: YuInput,
  Counter: YuCounter,
  CounterSide: YuCounterSide,
  Select: YuSelect,
  Cascader: YuCascader,
  Switch: YuSwitch,

  // 非组件
  Component: YuComponent,

  init: YuInit,
  data: {},
}

export default yu
