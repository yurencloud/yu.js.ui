import YU from '../index'
import NODE_CLASSNAME from '../common/const'


function getAttributeRefValue(nodeItem) {
  const ref = nodeItem.getAttribute(':ref')
  if (ref) {
    if (ref[0] === '$') {
      return YU.Data[ref.substr(1)]
    }
    return ref
  }
  return false
}

function getSingleComponent(componentType) {
  const component = {}
  const nodes = document.querySelectorAll(NODE_CLASSNAME[componentType])
  Array.from(nodes).forEach((item) => {
    // js优先
    const mounted = item.getAttribute(':mounted') === 'true'
    const ref = getAttributeRefValue(item)
    // 如果已经初始化过的，则不再重复初始化
    if (!mounted) {
      if (ref) {
        component[ref] = new YU[componentType](item)
      } else if (Array.isArray(component[componentType])) {
        component[componentType].push(new YU[componentType](item))
      } else {
        component[componentType] = [new YU[componentType](item)]
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
