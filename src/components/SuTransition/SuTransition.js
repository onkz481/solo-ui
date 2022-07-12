import Vue from 'vue'

// helpers
import { getSlot, isEmpty } from '../../util/helpers'
import { transitionNames } from '../../util/transition'

export default Vue.extend({
  name: 'SuTransition',
  props: {
    transition: {
      type: String,
      default: 'fade'
    },
    origin: {
      type: String,
      default: 'center center'
    },
    appear: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    defaultSlots: null
  }),
  computed: {
    computedTransition(){
      return transitionNames.includes(this.transition) ? this.transition : 'fade'
    }
  },
  watch: {
    origin: 'setOrigin'
  },
  mounted(){
    this.defaultSlots = getSlot(this)

    this.$nextTick(() => {
      this.setOrigin()
    })
  },
  methods: {
    setOrigin(){
      const { defaultSlots } = this

      if( isEmpty(defaultSlots) || isEmpty(defaultSlots[0].componentInstance) ) return

      defaultSlots[0].componentInstance.$el.style.transformOrigin = this.origin
    }
  },
  render(h){
    return h('transition', {
      props: {
        name: this.computedTransition,
        appear: this.appear,
      }
    }, this.$slots.default)
  }
})