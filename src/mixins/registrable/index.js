import Vue from 'vue'

function consoleWarning(child, parent){
  return () => console.warn(`The ${child} component must be used inside a ${parent}`) // eslint-disable-line
}

// inject
export function inject(namespace, child, parent){
  const defaultImpl = child && parent ? {
    register: consoleWarning(child, parent),
    unregister: consoleWarning(child, parent),
  } : null

  return Vue.extend({
    name: 'RegistrableInject',
    inject: {
      [namespace]: {
        default: defaultImpl
      }
    }
  })
}

// provide
export function provide(namespace, self = false){
  return Vue.extend({
    name: 'RegistrableProvide',
    provide(){
      return {
        [namespace]: self ? this : {
          register: this.register,
          unregister: this.unregister
        }
      }
    }
  })
}