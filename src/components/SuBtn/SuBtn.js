// styles
import './SuBtn.scss'

// components
import { SuProgressCircle } from '../SuProgress'

// mixins
import themeable from '../../mixins/themeable'
import colorable from '../../mixins/colorable'
import roundable from '../../mixins/roundable'
import sizeable from '../../mixins/sizeable'
import dimensionable from '../../mixins/dimensionable'
import elevatable from '../../mixins/elevatable'
import routable from '../../mixins/routable'

import Vue from 'vue'

export default Vue.extend({
  name: 'SuBtn',
  mixins: [themeable, colorable, roundable, sizeable, dimensionable, elevatable, routable],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: String,
      default: 'normal'
    },
    tag: {
      type: String,
      default: 'button',
    },
    text: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hasBg(){
      return !this.text && !this.outlined
    },
    classes(){
      return [
        'su-btn',
        ...routable.options.computed.classes.call(this),
        this.themeableClass,
        this.roundableClasses,
        this.sizeableClasses,
        this.elevatableClasses,
        {
          'su-btn--is-text': this.text,
          'su-btn--is-loading': this.loading,
          'su-btn--is-disabled': this.disabled,
          'su-btn--is-outlined': this.outlined,
          'su-btn--is-icon': this.icon,
          'su-btn--is-round': this.icon
        }
      ]
    },
    styles(){
      return [
        this.dimensionableInlines
      ]
    },
  },
  methods: {
    genContent(){
      return this.$slots.default.map(vnode => {
        return !vnode.context ? this.$createElement('span', {}, vnode.text) : vnode
      })
    },
    genLoader(){
      if( !this.loading ) return

      return this.$createElement(SuProgressCircle, {
        props: {
          indeterminate: true,
          size: 24
        }
      })
    }
  },
  render(h){
    const data = this[this.text ? 'setTextColor' : 'setBackgroundColor'](this.genData())

    data.attrs.type = 'button'
    data.attrs.disabled = this.disabled

    return h(this.genTag(), data, [
      this.loading ? this.genLoader() : this.genContent()
    ])
  }
})