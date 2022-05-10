// mixins
import colorable from '../../mixins/colorable'

import Vue from 'vue'

export default Vue.extend({
  name: 'SuLabel',
  mixins: [colorable],
  props: {
    text: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classes(){
      return [
        'su-label',
        this.colorableClasses
      ]
    }
  },
  render(h){
    return h('label', {
      class: this.classes
    }, this.$slots.default)
  }
})