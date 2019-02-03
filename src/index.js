import YuInit from './util/init'
import YuComponent from './util/component'

import YuButton from './component/button'
import YuRadio from './component/radio'
import YuRadioGroup from './component/radio-group'
import YuCheckbox from './component/checkbox'
import YuCheckboxGroup from './component/checkbox-group'
import YuInput from './component/input'
import YuCounter from './component/counter'
import YuCounterSide from './component/counter-side'
import YuSelect from './component/select'
import YuCascader from './component/cascader'
import YuSwitch from './component/switch'

const yu = {
  Button: YuButton,
  Radio: YuRadio,
  RadioGroup: YuRadioGroup,
  Checkbox: YuCheckbox,
  CheckboxGroup: YuCheckboxGroup,
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

  // 用setData就不会覆盖data, 这样就可以设置一些全局的变量
  setData: (data) => {
    Object.assign(yu.data, data)
  },
}

export default yu
