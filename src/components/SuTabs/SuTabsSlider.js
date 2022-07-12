import Vue from 'vue'

// styles
import './SuTabsSlider.scss'

// mixins
import colorable from '../../mixins/colorable'

// helpers
import { isNumber } from '../../util/helpers'

export default Vue.extend({
  name: 'SuTabsSlider',
  mixins: [colorable],
  props: {
    height: {
      type: [String, Number],
      default: 2
    },
    left: {
      type: [String, Number],
      default: 0
    },
    width: {
      type: [String, Number],
      default: 0
    },
  },
  computed: {
    computedHeight(){
      return isNumber(this.height) ? this.height : 2
    },
    computedLeft(){
      return isNumber(this.left) ? this.left : 0
    },
    computedWidth(){
      return isNumber(this.width) ? this.width : 0
    }
  },
  render(h){
    const { computedHeight, left, computedWidth } = this

    const data = this.setBackgroundColor({
      staticClass: 'su-tabs-slider',
      style: {
        width: `${computedWidth}px`,
        height: `${computedHeight}px`,
        left: `${left}px`
      }
    })

    return h('div', data)
  }
})