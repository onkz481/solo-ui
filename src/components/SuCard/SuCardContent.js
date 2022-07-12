import Vue from 'vue'

// styles
import './SuCardContent.scss'

export default Vue.extend({
  name: 'SuCardContent',
  render(h){
    return h('div', {
      staticClass: 'su-card__content'
    }, this.$slots.default)
  }
})