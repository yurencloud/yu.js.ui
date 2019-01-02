import YU from '../index'
import NODE_CLASSNAME from './const'

function parseAttributes(attributes) {
  const props = {}
  Array.from(attributes).forEach((item) => {
    if (item.value.indexOf('{') || item.value.indexOf('[')) {
      props[item.name.substr(1)] = JSON.parse(item.value)
    } else {
      props[item.name.substr(1)] = item.value
    }
  })
  return props
}

// 支持string, array, object
export default function YuComponents(value) {
  const components = {}
  // "Button"
  if (typeof value === 'string') {
    const nodes = document.querySelectorAll(NODE_CLASSNAME[value])
    Array.from(nodes).forEach((item) => {
      const props = parseAttributes(item.attributes)
      if (props.name) {
        components[props.name] = new YU[value]()
      } else {
        components[value] = [...components[value], new YU[value]()]
      }
    })
  }

  if (Array.isArray(value)) {

  }

  if (typeof value === 'object') {

  }
}
