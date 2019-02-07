<h2 align="center">yu.js.ui</h2>
<p align="center">yu.js.ui 基于原生JavaScript组件库</p>

<p align="center">
   <img src="https://img.shields.io/npm/v/yu.js.ui.svg" alt="">
    <img src="https://img.shields.io/github/stars/yurencloud/yu.js.ui.svg" alt="">
    <img src="https://img.shields.io/github/issues/yurencloud/yu.js.ui.svg" alt="">
    <img src="https://img.shields.io/github/forks/yurencloud/yu.js.ui.svg" alt="">
    <img src="https://img.shields.io/github/license/yurencloud/yu.js.ui.svg" alt="">
</p>

<p align="center">
  <a href="http://www.yurencloud.com/js-ui/component/install.html" target="_blank">使用文档</a>
  |
  <a href="https://github.com/yurencloud/yu.js.ui/tree/master/example/component/"  target="_blank">完整示例</a>
  |
  <a href="http://www.yurencloud.com"  target="_blank">官方网站</a>
</p>

## yu.js.ui的优势

- yu.js.ui 使用了yu.css.ui的样式，使用原生js，直接操作DOM，实现了element-ui, ant-design中的大部分组件
- yu.js.ui 源码是使用ES6编写的，基本为原生JavaScript，未使用任何第三方库。
- yu.js.ui 借鉴了一些Vue, React的表达方式和使用方式
- yu.js.ui 可以实现自定义组件
- yu.js.ui 同时支持ES5和ES6使用
- yu.js.ui 源码总共只有几十KB，虽然打包后会大一些
- yu.js.ui 基类核心代码只有30多行，仅让组件拥有状态，至于每个组件状态对应的DOM操作由组件自己实现

## 什么时候适合引入yu.js.ui
当你的项目未引入Vue, React, Angular，基本是直接操作DOM，此时你又怀念Vue, React的一些操作和用法，想念element-ui, ant-design 等库带来的便捷时，你就可以引入yu.js.ui

## 一、npm 引入 推荐

```shell
npm install --save yu.js.ui
```

使用,将yu挂载到window.yu

```javascript
import yu from "yu.js.ui"

yu.install()
```

## 二、使用CDN引入
目前可以通过 [unpkg.com/yu.js.ui](https://unpkg.com/yu.js.ui/dist/index.js) 获取到最新版本的资源，在页面上引入 js 文件即可开始使用。

```html
<script src="https://unpkg.com/yu.js.ui/dist/index.js"></script>
```
此js文件已经执行yu.install()，无需再重复执行

### 三、引入样式
yu.js.ui使用的是yu.css.ui的样式，所以样式引入，请参考 [yu.css.ui](http://www.yurencloud.com/css/install)
如果你想快速体验，并引入样式，只要添加
```html
<link rel="stylesheet" href="https://unpkg.com/yu.css.ui/dist/index.css">
```