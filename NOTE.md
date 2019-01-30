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
