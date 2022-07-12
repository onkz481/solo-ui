import Vue from 'vue'

// styles
import './SuListItemContent.scss'

export default Vue.extend({
  name: 'SuListItemContent',
  render(h){
    return h('div', {
      staticClass: 'su-list-item__content'
    }, this.$slots.default)
  }
})
