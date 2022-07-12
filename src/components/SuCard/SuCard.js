// styles
import './SuCard.scss'

// mixins
import routable from '../../mixins/routable'

// components
import SuSheet from '../SuSheet'

export default SuSheet.extend({
  name: 'SuCard',
  mixins: [routable],
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
        ...routable.options.computed.classes.call(this),
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
  },
  render(h){
    const data = this[this.text ? 'setTextColor' : 'setBackgroundColor'](this.genData())

    return h(this.genTag(), data, this.$slots.default)
  }
})