import Vue from 'vue'

// styles
import './SuOverlay.scss'

// helpers
import { insertBefore } from '../../util/helpers'

export default Vue.extend({
  name: 'SuOverlay',
  props: {
    absolute: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    overlay: null
  }),
  computed: {
    isActive(){
      return this.value
    },
    classes(){
      return [
        {
          'su-overlay--is-active': this.isActive,
          'su-overlay--is-absolute': this.absolute
        }
      ]
    }
  },
  mounted(){
    this.$nextTick(this.initialize())
  },
  destroyed(){
    this.$nextTick(this.finalize())
  },
  methods: {
    initialize(){
      if( !this.absolute ) insertBefore(this.$root.$el, this.$el, this.$root.$el.children[0])
    },
    finalize(){
      if( this.$el ) this.$el.remove()
    },
    genBackground(){
      const options = {
        staticClass: 'su-overlay__background'
      }

      return this.$createElement('div', options)
    },
    genContent(){
      if(!this.isActive) return

      const options = {
        staticClass: 'su-overlay__content'
      }

      return this.$createElement('div', options, this.$slots.default)
    }
  },
  render(h){
    const options = {
      staticClass: 'su-overlay',
      class: this.classes
    }

    return h('div', options, [this.genBackground(), this.genContent()])
  }
})