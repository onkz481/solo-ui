import Vue from 'vue'

// mixins
import routable from '../../mixins/routable'

export default Vue.extend({
  name: 'SuAppbarTitle',
  mixins: [routable],
  computed: {
    classes(){
      return [
        'su-appbar-title',
        ...routable.options.computed.classes.call(this),
      ]
    }
  },
  render(h){
    const data = this.genData()

    return h(this.genTag(), data, this.$slots.default)
  }
})