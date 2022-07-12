import Vue from 'vue'

// styles
import './SuAvatar.scss'

// mixins
import colorable from '../../mixins/colorable'
import roundable from '../../mixins/roundable'

// helpers
import { isNumber } from '../../util/helpers'

export default Vue.extend({
  name: 'SuAvatar',
  mixins: [colorable, roundable],
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
        this.roundableClasses
      ]
    },
    computedSize(){
      return isNumber(this.size) ? this.size : 48
    },
    styles(){
      return {
        width: `${this.computedSize}px`,
        minWidth: `${this.computedSize}px`,
        height: `${this.computedSize}px`,
      }
    }
  },
  render(h){
    return h('div', this.setBackgroundColor({
      class: this.classes,
      style: this.styles
    }), this.$slots.default)
  }
})