import Vue from 'vue'

export default Vue.extend({
  name: 'SuDivider',
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
      return {
        'su-divider--horizontal': !this.vertical,
        'su-divider--vertical': this.vertical
      };
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