// components
import { SuAvatar } from '../SuAvatar'

export default SuAvatar.extend({
  name: 'SuListItemAvatar',
  props: {
    size: {
      type: [Number, String],
      default: 40
    }
  },
  computed: {
    classes(){
      return [
        'su-list-item__avatar',
        ...SuAvatar.options.computed.classes.call(this)
      ]
    }
  },
  render(h){
    return h('div', {
      class: this.classes,
      style: this.styles
    }, this.$slots.default)
  }
})