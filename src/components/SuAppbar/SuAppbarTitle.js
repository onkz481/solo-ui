import Vue from 'vue'

// mixins
import routable from '../../mixins/routable'

export default Vue.extend({
  name: 'SuAppbarTitle',
  mixins: [routable],
  computed: {
    classes(){
      return [
        ...routable.options.computed.classes.call(this),
        'su-appbar-title'
      ]
    }
  },
  render(h){
    const tag = this.isRoute ? 'router-link' : this.tag

    const data = {
      props: {},
      class: this.classes
    }

    if( this.to ) data.props.to = this.to

    return h(tag, data, this.$slots.default)
  }
})