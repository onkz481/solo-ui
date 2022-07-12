function isValueFunction(binding){
  if (typeof binding.value !== 'function') {
    //console.warn('[Vue-click-outside:] provided expression', binding.expression, 'is not a function.')
    return false
  }

  return true
}

export const Resize = {
  bind: (el, binding, vnode) => {
    if (!isValueFunction(binding)) return

    const handler = (e) => {
      if( !vnode.context ) return

      el._onResize.callback(e)
    }

    el._onResize = {
      handler: handler,
      callback: binding.value
    }

    window.addEventListener('resize', handler)
  },
  unbind: (el) => {
    window.removeEventListener('resize', el._onResize.handler)

    delete el._onResize
  }
}

export default Resize