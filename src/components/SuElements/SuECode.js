import Vue from 'vue'

export default Vue.extend({
  name: 'SuECode',
  render(h){
    return h('code', {
      staticClass: 'su-e-code'
    }, this.$slots.default)
  }
})