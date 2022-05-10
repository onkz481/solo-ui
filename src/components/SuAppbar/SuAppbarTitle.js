import Vue from 'vue'

export default Vue.extend({
  name: 'SuAppbarTitle',
  computed: {
    classes(){
      return [
        'su-appbar-title'
      ]
    }
  },
  render(h){
    return h('div', {
      class: this.classes
    }, this.$slots.default)
  }
})