import Vue from 'vue'

// mixins
import themeable from '../../mixins/themeable'

export default Vue.extend({
  name: 'SuECode',
  mixins: [themeable],
  computed: {
    classes(){
      return [
        this.themeableClass
      ]
    }
  },
  render(h){
    return h('code', {
      staticClass: 'su-e-code',
      class: this.classes
    }, this.$slots.default)
  }
})