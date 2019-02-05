import Init from './util/init'
import Component from './util/component'

import Button from './component/button'
import Radio from './component/radio'
import RadioGroup from './component/radio-group'
import Checkbox from './component/checkbox'
import CheckboxGroup from './component/checkbox-group'
import Input from './component/input'
import Counter from './component/counter'
import CounterSide from './component/counter-side'
import Select from './component/select'
import Cascader from './component/cascader'
import Switch from './component/switch'

const yu = {
  NODE_CLASSNAME: {},
  Button,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Input,
  Counter,
  CounterSide,
  Select,
  Cascader,
  Switch,

  // 非组件
  Component,

  init: Init,
  install: () => {
    window.yu = yu
  },
  register: (component, componentType, selector) => {
    yu.NODE_CLASSNAME[componentType] = selector
    yu[componentType] = component
  },
  data: {},

  // 用setData就不会覆盖data, 这样就可以设置一些全局的变量
  setData: (data) => {
    Object.assign(yu.data, data)
  },
}

export default yu

export {
  Button,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Input,
  Counter,
  CounterSide,
  Select,
  Cascader,
  Switch,
  Component,
}
