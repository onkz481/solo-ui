import Vue from 'vue'

export default Vue.extend({
  name: 'SuCardActions',
  render(h){
    return h('div', {
      staticClass: 'su-card__actions'
    }, this.$slots.default)
  }
})