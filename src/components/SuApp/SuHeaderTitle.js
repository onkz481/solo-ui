// components
import { SuAppbarTitle } from '../SuAppbar'

export default SuAppbarTitle.extend({
  name: 'SuHeaderTitle',
  render(h){
    return h('div', {
      staticClass: 'su-header-title',
      class: this.classes
    }, this.$slots.default)
  }
})