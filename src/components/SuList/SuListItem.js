// styles
import './SuListItem.scss'

// mixins
import themeable from '../../mixins/themeable'
import colorable from '../../mixins/colorable'
import routable from '../../mixins/routable'
import { factory as GroupableFactory } from '../../mixins/groupable'
import toggleable from '../../mixins/toggleable'

import Vue from 'vue'

export default Vue.extend({
  name: 'SuListItem',
  mixins: [themeable, colorable, routable, GroupableFactory('listItemGroup'), toggleable],
  props: {
    text: {
      type: Boolean,
      default: true
    },
    twoLine: {
      type: Boolean,
      default: false
    },
    threeLine: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    internalClass: 'su-list-item--active'
  }),
  computed: {
    classes(){
      return [
        'su-list-item',
        ...routable.options.computed.classes.call(this),
        this.themeableClass,
        this.isActive && this.colorableClasses,
        {
          'su-list-item--is-link': this.isLink,
          'su-list-item--two-line': this.twoLine,
          'su-list-item--three-line': this.threeLine
        }
      ]
    },
    styles(){
      return [
        this.isActive && this.colorableInlines
      ]
    }
  },
  methods: {
    toggle(){
      if( this.to && this.toggleValue === undefined )
        this.isActive = !this.isActive

      this.$emit('change')
    }
  },
  render(h){
    const data = this.genData()

    return h(this.genTag(), data, this.$slots.default)
  }
})