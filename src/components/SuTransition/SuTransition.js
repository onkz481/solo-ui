export default {
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
  mounted(){
    this.initialize()
  },
  methods: {
    initialize(){
      if(this.$slots.default && this.$slots.default[0].elm) this.$slots.default[0].elm.style.transformOrigin = this.origin
    }
  },
  render(h){
    return h('transition', {
      props: {
        name: this.transition,
        appear: this.appear,
      }
    }, this.$slots.default)
  }
}