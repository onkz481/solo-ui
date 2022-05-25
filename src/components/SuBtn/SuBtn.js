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
    tag: {
      type: String,
      default: 'button',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: String,
      default: 'normal'
    }
  },
  computed: {
    hasBg(){
      return !this.text && !this.outlined
    },
    classes(){
      return [
        'su-btn__reset',
        ...routable.options.computed.classes.call(this),
        this.themeableClass,
        this.colorableClasses,
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
        this.colorableInlines,
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

      return this.$createElement('span', {
        staticClass: 'su-btn__loader'
      }, [
        this.genAnimation()
      ])
    },
    genAnimation(){
      return this.$createElement('i', {
        staticClass: 'su-btn--loading-animation'
      })
    },
    onClick(e){
      this.$emit('click', e);
    }
  },
  render(h){
    const tag = this.to ? 'router-link' : this.tag

    const data = {
      staticClass: 'su-btn',
      attrs: {
        type: 'button'
      },
      class: this.classes,
      style: this.styles,
      props: {
        disabled: this.disabled || this.loading
      },
      on: {
        click: this.onClick
      }
    }

    if( this.to ) data.props.to = this.to

    return h(tag, data, [
      this.loading ? this.genLoader() : this.genContent()
    ])
  }
})