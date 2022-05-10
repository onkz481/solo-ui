function isValueFunction(binding){
  if (typeof binding.value !== 'function') {
    //console.warn('[Vue-click-outside:] provided expression', binding.expression, 'is not a function.')
    return false
  }

  return true
}

function isShow(el){
  return el.style.display !== 'none';
}

export const ClickOutside = {
  bind: (el, binding, vnode) => {
    if (!isValueFunction(binding)) return;

    const handler = (e) => {
      if( !isShow(el) || !vnode.context ) return

      if( el.contains(e.target) ) return

      el._ClickOutside.callback(e)
    }

    el._ClickOutside = {
      handler: handler,
      callback: binding.value
    }

    const clickHandler = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click'
    document.addEventListener(clickHandler, handler)
  },
  unbind: (el) => {
    const clickHandler = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click'
    document.removeEventListener(clickHandler, el._ClickOutside.handler)

    delete el._ClickOutside
  }
}

export default ClickOutside