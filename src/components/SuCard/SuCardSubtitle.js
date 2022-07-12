import Vue from 'vue'

// styles
import './SuCardSubtitle.scss'

export default Vue.extend({
  name: 'SuCardSubtitle',
  render(h){
    return h('div', {
      staticClass: 'su-card__subtitle'
    }, this.$slots.default)
  }
})