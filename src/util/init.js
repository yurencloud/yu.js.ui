import YU from '../index'
import NODE_CLASSNAME from '../common/const'
import parseAttributes from '../common/tool'

function getSingleComponent(componentName, statesValue) {
  const component = {}
  const nodes = document.querySelectorAll(NODE_CLASSNAME[componentName])
  Array.from(nodes).forEach((item) => {
    const states = statesValue || {}
    // 同行属性优先
    Object.assign(states, parseAttributes(item.attributes))
    if (states.ref) {
      component[states.ref] = new YU[componentName](item, states)
    } else if (Array.isArray(component[componentName])) {
      component[componentName].push(new YU[componentName](item, states))
    } else {
      component[componentName] = [new YU[componentName](item, states)]
    }
  })
  return component
}

function getMultipleComponent(componentNameList) {
  const components = {}
  componentNameList.forEach((item) => {
    const component = getSingleComponent(item)
    Object.assign(components, component)
  })
  return components
}

function getMultipleStatesComponent(componentsNameAndState) {
  const components = {}
  for (const componentName of Object.keys(componentsNameAndState)) {
    if (Array.isArray(componentsNameAndState[componentName])) {
      componentsNameAndState[componentName].forEach((states) => {
        const component = getSingleComponent(componentName, states)
        Object.assign(components, component)
      })
    } else {
      const component = getSingleComponent(componentName, componentsNameAndState[componentName])
      Object.assign(components, component)
    }
  }
  return components
}

// 支持string, array, object
export default function YuInit(value) {
  // "Button"
  if (typeof value === 'string') {
    return getSingleComponent(value)
  }

  // ["Button", "Radio"...]
  if (Array.isArray(value)) {
    return getMultipleComponent(value)
  }

  // {Button: {ref: 'myButton', type: 'primary'}} 或 {Button: [{ref: 'myButton', type: 'primary'},...]}
  if (typeof value === 'object') {
    return getMultipleStatesComponent(value)
  }
}
