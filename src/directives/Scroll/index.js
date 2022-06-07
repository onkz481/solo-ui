function isValueFunction(binding){
  if (typeof binding.value !== 'function') {
    //console.warn('[Vue-click-outside:] provided expression', binding.expression, 'is not a function.')
    return false
  }

  return true
}

export const Scroll = {
  bind: (el, binding, vnode) => {
    if (!isValueFunction(binding)) return

    const handler = (e) => {
      if( !vnode.context ) return

      el._onScroll.callback(e, el, binding, vnode)
    }

    el._onScroll = {
      handler: handler,
      callback: binding.value
    }

    window.addEventListener('scroll', handler)
  },
  unbind: (el) => {
    window.removeEventListener('scroll', el._onScroll.handler)

    delete el._onScroll
  }
}

export default Scroll