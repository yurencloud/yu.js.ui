#### 1、原则：如果是组件，则组件容器不能省略
`容器`也就是一个组件的最外层元素,负责接收属性参数，也可包含部分固定的内部基本元素

以.yu-select为例
```
    <div class="yu-select" :option="$option">
        <div class="yu-input" :suffix="icon-angle-down">
            <input type="text">
        </div>
        <ul class="yu-option transition"></ul>
    </div>
```
.yu-select由两个子组件组成，.yu-input, .yu-option，所以.yu-input和.yu-option的容器不能省略

#### 2. 允许绑定多重事件
比如input组件实例化了，但select中包含了input组件，又给了input其他事件和职责,这是正常的。


#### 3. 自定义事件没必要传递事件对象 event，像input只要传递值就好，如果真的需要获取事件对象，直接原生addEventListener添加事件监听

#### 4. 因为select的选项可以固定，并且少，所以可以手写。而手写的选项必须要构造时就添加事件。重置选项时，再重新绑定事件。而级联时无法手写选项，所以不必构造时就添加事件，每次生成选项，每次都添加。

#### 5. 构造一些元素经常要传入option，option参数可多可少，全部按最小化来传入，能由其他属性来控制的，不要通过option参数来传入，避免重复设置

#### 6.关于入口文件
dist/index.js 是最终打包成es5, 支持require,import。也可以直接通过script引入使用的。

src/index.js 是提供给同样使用es6, 同样使用babel进行转换的人进行使用的源码，未打包过。

build/prod.js 主要是引入了src/index.js，同时执行了yu.install()，为了方便用户能直接引入，不用再执行yu.install()


build/dev.js 在引入prod.js的基础上，还引入了样式

#### 7. 开发时，样式包的引入问题
首先为了第三方也能开启开发模式，所以必须引入
```
npm install -D yu.css.ui
```

再者，因为本地经常会改yu.css.ui，为了实现最新的yu.css.ui样式
```
npm link yu.css.ui
```
这样就能保证自己是最新，他人样式可能不是最新，但能正常显示




