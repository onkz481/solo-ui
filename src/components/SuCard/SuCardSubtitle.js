import Vue from 'vue'

export default Vue.extend({
  name: 'SuCardSubtitle',
  render(h){
    return h('div', {
      staticClass: 'su-card__subtitle'
    }, this.$slots.default)
  }
})