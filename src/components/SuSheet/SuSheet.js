import Vue from 'vue'

// styles
import './SuSheet.scss'

// mixins
import themeable from '../../mixins/themeable'
import colorable from '../../mixins/colorable'
import roundable from '../../mixins/roundable'
import dimensionable from '../../mixins/dimensionable'
import elevatable from '../../mixins/elevatable'
import { generator as TagableGenerator } from '../../mixins/tagable'

export default Vue.extend({
  name: 'SuSheet',
  mixins: [
    TagableGenerator('div'),
    themeable, colorable, roundable, dimensionable, elevatable],
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    text: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes(){
      return [
        'su-sheet',
        {
          'su-sheet--outlined': this.outlined
        },
        this.themeableClass,
        this.roundableClasses,
        this.elevatableClasses
      ]
    },
    styles(){
      return [
        this.dimensionableInlines
      ]
    },
    listeners(){
      return Object.assign({}, this.$listeners)
    }
  },
  render(h){
    const data = this[this.text ? 'setTextColor' : 'setBackgroundColor']({
      class: this.classes,
      style: this.styles,
      on: this.listeners
    })

    return h(this.computedTag, data, this.$slots.default)
  }
})