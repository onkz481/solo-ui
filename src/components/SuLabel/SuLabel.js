// styles
import './SuLabel.scss'

// mixins
import themeable from '../../mixins/themeable'
import colorable from '../../mixins/colorable'
import sizeable from '../../mixins/sizeable'

import Vue from 'vue'

export default Vue.extend({
  name: 'SuLabel',
  mixins: [themeable, colorable, sizeable],
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
        this.themeableClass,
        this.colorableClasses,
        this.sizeableClasses,
      ]
    }
  },
  render(h){
    return h('label', {
      class: this.classes
    }, this.$slots.default)
  }
})