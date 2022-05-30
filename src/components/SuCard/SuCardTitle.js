import Vue from 'vue'

// styles
import './SuCardTitle.scss'

export default Vue.extend({
  name: 'SuCardTitle',
  render(h){
    return h('div', {
      staticClass: 'su-card__title'
    }, this.$slots.default)
  }
})