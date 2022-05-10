import Vue from 'vue'

function consoleWarning(child, parent){
  return () => console.warn(`The ${child} component must be used inside a ${parent}`) // eslint-disable-line
}

export function inject(namespace, child, parent){
  const defaultImpl = child && parent ? {
    register: consoleWarning(child, parent),
    unregister: consoleWarning(child, parent),
  } : null

  return Vue.extend({
    name: 'RegistableInject',
    inject: {
      [namespace]: {
        default: defaultImpl
      }
    }
  })
}