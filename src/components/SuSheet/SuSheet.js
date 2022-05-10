// mixins
import colorable from '../../mixins/colorable'
import roundable from '../../mixins/roundable'
import dimensionable from '../../mixins/dimensionable'
import elevatable from '../../mixins/elevatable'

import Vue from 'vue'

export default Vue.extend({
  name: 'SuSheet',
  mixins: [colorable, roundable, dimensionable, elevatable],
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    outlined: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes(){
      return [
        'su-sheet',
        {
          'su-sheet--outlined': this.outlined
        },
        this.colorableClasses,
        this.roundableClasses,
        this.elevatableClasses
      ]
    },
    styles(){
      return [
        this.colorableInlines,
        this.dimensionableInlines
      ]
    },
    listeners(){
      return Object.assign({}, this.$listeners)
    }
  },
  render(h){
    return h(this.tag, {
      class: this.classes,
      style: this.styles,
      on: this.listeners
    }, this.$slots.default)
  }
})