import Vue from 'vue'

// mixins
import themeable from '../../mixins/themeable';

export default Vue.extend({
  name: 'SuDivider',
  mixins: [themeable],
  props: {
    vertical: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    
  }),
  computed: {
    classes(){
      return [
        this.themeableClass,
        {
          'su-divider--horizontal': !this.vertical,
          'su-divider--vertical': this.vertical
        }
      ]
    },
    ariaOrientation(){
      return this.vertical ? 'vertical' : 'horizontal';
    }
  },
  render(h){
    return h('hr', {
      staticClass: 'su-divider',
      class: this.classes,
      attrs: {
        role: 'separator',
        'aria-orientation': this.ariaOrientation
      }
    })
  }
})