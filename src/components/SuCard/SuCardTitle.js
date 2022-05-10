import Vue from 'vue'

export default Vue.extend({
  name: 'SuCardTitle',
  render(h){
    return h('div', {
      staticClass: 'su-card__title'
    }, this.$slots.default)
  }
})