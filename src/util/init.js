import yu from '../index'
import NODE_CLASSNAME from '../common/const'


function getAttributeRefValue(nodeItem) {
  const ref = nodeItem.getAttribute(':ref')
  if (ref) {
    if (ref[0] === '$') {
      return yu.data[ref.substr(1)]
    }
    return ref
  }
  return false
}

function getSingleComponent(componentType) {
  const component = {}
  const nodes = document.querySelectorAll(NODE_CLASSNAME[componentType] || yu.NODE_CLASSNAME[componentType])
  Array.from(nodes).forEach((item) => {
    // js优先
    const notMount = item.getAttribute('mounted') === '' || item.getAttribute('unmount') === ''
    const ref = getAttributeRefValue(item)
    // 如果已经初始化过的，则不再重复初始化
    if (!notMount) {
      const instance = new yu[componentType](item)
      if (Array.isArray(component[componentType])) {
        component[componentType].push(instance)
      } else {
        component[componentType] = [instance]
      }
      // ref 只是添加了一个alia，辅助访问。即同时可以用the.Button[2], 也可以用the.myButton, 主要是为了the.Button可以遍历控制所有元素
      if (ref) {
        component[ref] = instance
      }
    }
  })
  return component
}


function getMultipleComponent(componentTypeList) {
  const components = {}
  componentTypeList.forEach((item) => {
    const component = getSingleComponent(item)
    Object.assign(components, component)
  })
  return components
}

export default function YuInit(...args) {
  return getMultipleComponent(args)
}
