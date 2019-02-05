/* eslint-disable */

yu.setData({
    menuOption: [
        {href: 'init.html', label: '组件的多种初始化方式', key: 'init'},
        {href: 'custom-component.html', label: 'ES5自定义组件', key: 'custom-component'},
        {href: 'button.html', label: 'button', key: 'button'},
    ],
})

function WebIndex(component, states) {
    // 创建组件实例
    var comp = new yu.Component()
    // 添加组件属性方法
    comp.option = function (option) {
        if (option.length > 0) {
            this.node.innerHTML = ''
            option.forEach((item) => {
                comp.node.appendChild(comp.createOption(item))
            })
        }
    }
    // 添加组件静态方法
    comp.createOption = function (option) {
        var li = document.createElement('LI')
        li.setAttribute('data-key', option.key)
        var a = document.createElement('A')
        a.innerText = option.label
        a.href = option.href
        li.appendChild(a)
        return li
    }

    comp.init(component, states)
    var temp = window.location.pathname.split('/component/')[1]
    var currentKey = temp.substr(0, temp.length - 5)
    comp.node.querySelector('li[data-key=' + currentKey + ']').classList.add('active')
    return comp
}
