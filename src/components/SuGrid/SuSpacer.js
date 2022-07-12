import Vue from 'vue'

export default Vue.extend({
  name: 'SuSpacer',
  render(h){
    return h('div', {
      staticClass: 'su-spacer'
    })
  }
})