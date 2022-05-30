import Vue from 'vue'

// styles
import './SuListItemIcon.scss'

export default Vue.extend({
  name: 'SuListItemIcon',
  data: () => ({
    isFirst: false
  }),
  computed: {
    classes(){
      return [
        'su-list-item__icon'
      ]
    }
  },
  render(h){
    return h('div', {
      class: this.classes
    }, this.$slots.default)
  }
})
