import './assets/css/app.css'
import 'yu.css.ui/dist/index.css'
import hljs from 'highlight.js'
import yu from '../lib/index'

import WebIndex from './assets/js/WebIndex'
import Code from './assets/js/Code'

yu.install()

yu.setData({
  menuOption: [
    { href: 'http://www.yurencloud.com', label: '愚人云端', key: 'yurencloud' },
    { href: 'https://github.com/yurencloud/yu.js.ui', label: 'Github', key: 'github' },
    { href: 'install.html', label: '安装', key: 'install' },
    { href: 'quick.html', label: '快速体验', key: 'quick' },
    { href: 'init.html', label: '组件初始化', key: 'init' },
    { href: 'state.html', label: '组件状态', key: 'state' },
    { href: 'event.html', label: '组件事件', key: 'event' },
    { href: 'component.html', label: '组件继承和生命周期', key: 'component' },
    { href: 'es5-component.html', label: 'ES5自定义组件', key: 'es5-component' },
    { href: 'es6-component.html', label: 'ES6自定义组件', key: 'es6-component' },
    { href: 'button.html', label: 'Button 按钮', key: 'button' },
    { href: 'radio.html', label: 'Radio 单选框', key: 'radio' },
    { href: 'radio-group.html', label: 'RadioGroup 单选框组', key: 'radio-group' },
    { href: 'checkbox.html', label: 'Checkbox 复选框', key: 'checkbox' },
    { href: 'checkbox-group.html', label: 'CheckboxGroup 复选框组', key: 'checkbox-group' },
    { href: 'input.html', label: 'Input 输入框', key: 'input' },
    { href: 'counter.html', label: 'Counter 计数器', key: 'counter' },
    { href: 'select.html', label: 'Select 下拉选择器', key: 'select' },
    { href: 'cascader.html', label: 'Cascader 级联选择器', key: 'cascader' },
    { href: 'switch.html', label: 'Switch 开关', key: 'switch' },
  ],
})
// highlight初始化
hljs.configure({ useBR: true })

hljs.initHighlightingOnLoad()
yu.register(WebIndex, 'WebIndex', '.web-index')
yu.register(Code, 'Code', '.yu-code')

yu.init('WebIndex', 'Code')
