function isValueObject(binding){
  return typeof binding.value !== 'object' 
}

function isValueFunction(binding){
  if( !isValueObject ) return false

  Object.keys(binding.value).forEach(val => {
    if( typeof val !== 'function' ) return false
  })

  return true
}

// up down left right Gesture event handler
const handleGesture = (wrapper) => {
  const { touchstartX, touchendX, touchstartY, touchendY } = wrapper
  const dirRatio = 0.5
  const minDistance = 16
  wrapper.offsetX = touchendX - touchstartX
  wrapper.offsetY = touchendY - touchstartY

  if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
    wrapper.left && (touchendX < touchstartX - minDistance) && wrapper.left(wrapper)
    wrapper.right && (touchendX > touchstartX + minDistance) && wrapper.right(wrapper)
  }

  if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
    wrapper.up && (touchendY < touchstartY - minDistance) && wrapper.up(wrapper)
    wrapper.down && (touchendY > touchstartY + minDistance) && wrapper.down(wrapper)
  }
}

function touchEvent(e, wrapper, name){
  const touch = e.changedTouches[0]
  
  wrapper[`touch${name}X`] = touch.clientX
  wrapper[`touch${name}Y`] = touch.clientY

  wrapper[name] && wrapper[name](Object.assign(e, wrapper))

  if( name === 'end' ) handleGesture(wrapper)
}

function eventHandlers(value){
  const wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    end: value.end,
    move: value.move,
  }

  return {
    touchstart: (e) => touchEvent(e, wrapper, 'start'),
    touchend: (e) => touchEvent(e, wrapper, 'end'),
    touchmove: (e) => touchEvent(e, wrapper, 'move')
  }
}

export const Touch = {
  bind: (el, binding) => {
    if (!isValueFunction(binding)) return

    const handlers = eventHandlers(binding.value)

    el._onTouchs = handlers
    
    Object.keys(handlers).forEach(key => {
      el.addEventListener(key, handlers[key])
    })
  },
  unbind: (el) => {
    const handlers = el._onTouchs

    Object.keys(handlers).forEach(key => {
      el.removeEventListener(key, handlers[key])
    })

    delete el._onTouchs
  }
}

export default Touch