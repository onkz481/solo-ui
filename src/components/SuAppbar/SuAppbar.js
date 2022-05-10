// components
import SuSheet from '../SuSheet'

export default SuSheet.extend({
  name: 'SuAppbar',
  props: {
    tag: {
      type: String,
      default: 'header'
    },
    dense: {
      type: Boolean,
      default: false
    },
    prominent: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes(){
      return [
        'su-appbar',
        {
          'su-appbar--dense': this.dense,
          'su-appbar--prominent': this.prominent
        },
        ...SuSheet.options.computed.classes.call(this)
      ]
    },
    styles(){
      return [
        ...SuSheet.options.computed.styles.call(this)
      ]
    }
  },
  render(h){
    return h(this.tag, {
      class: this.classes,
      style: this.styles
    }, this.$slots.default)
  }
})