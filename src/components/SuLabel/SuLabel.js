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
  computed: {
    classes(){
      return [
        'su-label',
        this.themeableClass,
        this.sizeableClasses,
      ]
    }
  },
  render(h){
    return h('label', this.setTextColor({
      class: this.classes
    }), this.$slots.default)
  }
})