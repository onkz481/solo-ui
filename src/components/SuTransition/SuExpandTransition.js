import Vue from 'vue'

export default Vue.extend({
  name: 'SuExpandTransition',
  props: {
    x: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    onTransitions(){
      const sizePropety = this.x ? 'width' : 'height'
      const offsetPropety = this.x ? 'offsetWidth' : 'offsetHeight'

      const resetStyles = (el) => {
        el.style.overflow = el._initialStyle.overflow
        el.style[sizePropety] = el._initialStyle[sizePropety]

        delete el._initialStyle
      }

      const initialStyles = (el) => {
        el._initialStyle = {
          overflow: el.style.overflow,
          [sizePropety]: el.style[sizePropety]
        }
      }

      return {
        beforeEnter: initialStyles,
        enter: (el) => {
          const offset = `${el[offsetPropety]}px`

          el.style.overflow = 'hidden'
          el.style[sizePropety] = null
          
          requestAnimationFrame(() => {
            el.style[sizePropety] = '0'
            requestAnimationFrame(() => {
              el.style[sizePropety] = offset
            })
          })
        },
        afterEnter: resetStyles,
        enterCancelled: resetStyles,
        beforeLeave: initialStyles,
        leave: (el) => {
          el.style.overflow = 'hidden'
          el.style[sizePropety] = `${el[offsetPropety]}px`
          
          requestAnimationFrame(() => {
            el.style[sizePropety] = '0'
          })
        },
        afterLeave: resetStyles,
        leaveCancelled: resetStyles,
      }
    }
  },
  render(h){
    return h('transition', {
      props: {
        name: `expand-${this.x ? 'x' : 'y'}`
      },
      on: this.onTransitions
    }, this.$slots.default)
  }
})