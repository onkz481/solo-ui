import Vue from 'vue'

export default Vue.extend({
  name: 'SuSlideSwitchTransition',
  props: {
    parentNode: {
      type: Object,
      default: undefined
    },
    y: {
      type: Boolean,
      default: false
    },
    reverse: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    onTransitions(){
      const directionPropety = this.y ? 'top' : 'left'

      const resetStyles = (el) => {
        el.style.width = el._initialStyle.width
        el.style.position = el._initialStyle.position
        el.style[directionPropety] = el._initialStyle[directionPropety]

        delete el._initialStyle
      }

      const InitialStyles = (el) => {
        el._initialStyle = {
          width: el.style.width,
          position: el.style.position,
          [directionPropety]: el.style[directionPropety]
        }
      }

      return {
        beforeEnter: InitialStyles,
        enter: (el) => {
          const parentNode = this.parentNode ? this.parentNode.$el : this.$el.parentNode
          
          parentNode.style.position = 'relative'
          parentNode.style.overflow = 'hidden'
          parentNode.style.height = `${el.clientHeight}px`
          
          el.style.width = `${el.clientWidth}px`
          el.style.position = 'absolute'
          el.style[directionPropety] = this.reverse ? '-100%' : '100%'
          
          requestAnimationFrame(() => {
            el.style[directionPropety] = 0
          })
        },
        afterEnter: (el) => {
          const parentNode = this.parentNode ? this.parentNode.$el : this.$el.parentNode

          resetStyles(el)

          parentNode.style.position = ''
          parentNode.style.overflow = ''
          parentNode.style.height = ''
        },
        enterCancelled: resetStyles,
        beforeLeave: InitialStyles,
        leave: (el) => {
          el.style.width = `${el.clientWidth}px`
          el.style.position = 'absolute'
          el.style[directionPropety] = 0

          requestAnimationFrame(() => {
            el.style[directionPropety] = this.reverse ? '100%' : '-100%'
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
        name: 'slide-switch'
      },
      on: this.onTransitions
    }, this.$slots.default)
  }
})