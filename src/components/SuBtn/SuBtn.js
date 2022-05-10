// mixins
import colorable from '../../mixins/colorable'
import roundable from '../../mixins/roundable'
import sizeable from '../../mixins/sizeable'
import elevatable from '../../mixins/elevatable'

import Vue from 'vue'

export default Vue.extend({
  name: 'SuBtn',
  mixins: [colorable, roundable, sizeable, elevatable],
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
  data: () => ({
    isDark: false,
    hasIcon: false,
    hasIconIsFirst: false,
    hasIconIsLast: false
  }),
  computed: {
    hasBg(){
      return !this.text && !this.outlined
    },
    classes(){
      return [
        'su-btn__reset',
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
          'su-btn--is-round': this.icon,
          'su-btn--has-icon': this.hasIcon,
          'su-btn--has-icon--is-first': this.hasIconIsFirst,
          'su-btn--has-icon--is-last': this.hasIconIsLast,
        }
      ];
    },
    styles(){
      return [
        this.colorableInlines
      ];
    },
  },
  mounted(){
    this.initialize();
  },
  methods: {
    initialize(){
      //-- ダークモードの判定
      this.isDark = (window.matchMedia('(prefers-color-scheme: dark)').matches == true) ? true : false;

      // has icon
      this.hasIcon = Boolean(!this.icon && this.$slots.default.some(vnode => vnode.child && vnode.child.$options._componentTag === 'su-icon'));

      if( !this.icon ){
        let length = this.$slots.default.length;

        // has icon first
        this.hasIconIsFirst = Boolean(this.$slots.default[0].child && this.$slots.default[0].child.$options._componentTag === 'su-icon');
        // has icon last
        this.hasIconIsLast = Boolean((length > 1) && this.$slots.default[length - 1].child && this.$slots.default[length - 1].child.$options._componentTag === 'su-icon');
      }
    },
    genContent(){
      return this.$createElement('span', {}, this.$slots.default)
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
    return h(this.tag, {
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
    }, [
      this.loading ? this.genLoader() : this.genContent()
    ])
  }
})