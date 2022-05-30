// styles
import './SuAvatar.scss'

// mixins
import colorable from '../../mixins/colorable'
import roundable from '../../mixins/roundable'
import dimensionable from '../../mixins/dimensionable'

import Vue from 'vue'

export default Vue.extend({
  name: 'SuAvatar',
  mixins: [colorable, roundable, dimensionable],
  props: {
    size: {
      type: [Number, String],
      default: 48
    }
  },
  computed: {
    classes(){
      return [
        'su-avatar',
        this.colorableClasses,
        this.roundableClasses
      ]
    },
    styles(){
      return [
        {
          width: `${this.size}px`,
          minWidth: `${this.size}px`,
          height: `${this.size}px`,
        },
        this.colorableInlines,
        this.dimensionableInlines
      ]
    }
  },
  render(h){
    return h('div', {
      class: this.classes,
      style: this.styles
    }, this.$slots.default)
  }
})