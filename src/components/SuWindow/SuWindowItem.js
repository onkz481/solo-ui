// mixins
import { factory as GroupableFactory } from '../../mixins/groupable'

// components
import SuSlideSwitchTransition from '../SuTransition/SuSlideSwitchTransition'

import Vue from 'vue'

export default Vue.extend({
  mixins: [GroupableFactory('windowGroup', 'su-window', 'su-window-item')]
}).extend({
  name: 'SuWindowItem',
  methods: {
    genTransition(node){
      if( typeof node !== 'object' ) return

      return this.$createElement(SuSlideSwitchTransition, {
        props: {
          parentNode: this['windowGroup'],
          reverse: this['windowGroup'].pageAction === 'prev',
          y: this['windowGroup'].vertical
        }
      }, [node])
    }
  },
  render(h){
    return this.genTransition(h('div', {
      class: [
        'su-window-item'
      ],
      directives: [
        {
          name: 'show',
          value: this.isActive
        }
      ]
    }, this.$slots.default))
  }
})