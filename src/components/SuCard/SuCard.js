// mixins
import linkable from '../../mixins/linkable'

// components
import SuSheet from '../SuSheet'

export default SuSheet.extend({
  name: 'SuCard',
  mixins: [linkable],
  props: {
    rounded: {
      type: String,
      default: 'normal'
    }
  },
  computed: {
    classes(){
      return [
        'su-card',
        ...SuSheet.options.computed.classes.call(this),
        {
          'su-card--is-link': this.isClickable,
        }
      ]
    },
    styles(){
      return [
        ...SuSheet.options.computed.styles.call(this)
      ]
    }
  }
})