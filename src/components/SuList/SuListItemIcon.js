import Vue from 'vue'

export default Vue.extend({
  name: 'SuListItemIcon',
  data: () => ({
    isFirst: false
  }),
  computed: {
    classes(){
      return [
        'su-list-item__icon',
        {
          'su-list-item__icon--is-first': this.isFirst
        }
      ];
    }
  },
  render(h){
    return h('div', {
      class: this.classes
    }, this.$slots.default)
  }
})
