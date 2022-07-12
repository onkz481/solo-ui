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
    overlay: null,
    parentNode: undefined
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
  watch: {
    absolute(){
      this.insertEl()
    }
  },
  mounted(){
    this.parentNode = this.$el.parentNode

    this.$nextTick(() => {
      this.insertEl()
    })
  },
  destroyed(){
    this.$nextTick(this.finalize())
  },
  methods: {
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
    },
    insertEl(){
      insertBefore(this.absolute ? this.parentNode : this.$root.$el, this.$el)
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