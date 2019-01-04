import YU from '../index'
import NODE_CLASSNAME from '../common/const'
import parseAttributesToStates from '../common/tool'

function getSingleComponent(componentType) {
  const component = {}
  const nodes = document.querySelectorAll(NODE_CLASSNAME[componentType])
  Array.from(nodes).forEach((item) => {
    // js优先
    const states = parseAttributesToStates(item.attributes)
    // 如果已经初始化过的，则不再重复初始化
    if (!states.mounted) {
      if (states.ref) {
        component[states.ref] = new YU[componentType](item, states)
      } else if (Array.isArray(component[componentType])) {
        component[componentType].push(new YU[componentType](item, states))
      } else {
        component[componentType] = [new YU[componentType](item, states)]
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
