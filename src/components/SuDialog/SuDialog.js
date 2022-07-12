import Vue from 'vue'

// styles
import './SuDialog.scss'

// mixins
import activitable from '../../mixins/activatable'
import overlayable from '../../mixins/overlayable'
import transitionable from '../../mixins/transitionable'

// directives
import ClickOutside from '../../directives/ClickOutside'

// helpers
import { getAppAbsolutedInnerElement, insertBefore, isNumber, rectangle } from '../../util/helpers'

export default Vue.extend({
  name: 'SuDialog',
  directives: {
    ClickOutside
  },
  mixins: [activitable, overlayable, transitionable],
  props: {
    fullscreen: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: [String, Number],
      default: undefined
    },
    value: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: undefined
    }
  },
  data: () => ({
    dialogContentNode: null
  }),
  computed: {
    computedMaxWidth(){
      return !this.fullscreen && isNumber(this.maxWidth) ? this.maxWidth : undefined
    },
    computedWidth(){
      return !this.fullscreen && isNumber(this.width) ? this.width : undefined
    },
  },
  watch: {
    value(){
      const handler = document._StopScroll ? document._StopScroll.handler : (e) => {
        e.preventDefault()
      }

      document._StopScroll = {
        handler: handler
      }

      const wheelHandler = 'ontouchmove' in document.documentElement ? 'touchmove' : 'mousewheel'
      if(this.value){
        document.documentElement.addEventListener(wheelHandler, handler, {passive: false})
      } else {
        document.documentElement.removeEventListener(wheelHandler, handler, {passive: false})
      }
    }
  },
  mounted(){
    this.$nextTick(this.initialize())
  },
  methods: {
    initialize(){
      if( this.dialogContentNode ) insertBefore(this.$root.$el, this.dialogContentNode['elm'])
    },
    genActivatorEventListeners(){
      return {
        'click': () => {
          this.$emit('input', !this.value)
        }
      }
    },
    genContentWrap(){
      const options = {
        staticClass: 'su-dialog__wrapper',
        class: [
          {
            'su-dialog--is-fullscreen': this.fullscreen
          }
        ]
      }

      return this.$createElement('div', options, [this.genTransition(this.genContent())])
    },
    genContent(){
      if( !this.value ) return

      const appAbsolutedInner = getAppAbsolutedInnerElement()
      const gutter = 16
      const gutterWidth = appAbsolutedInner ? rectangle(appAbsolutedInner).width : rectangle(this.$root.$el).width - (gutter * 2)

      const width = gutterWidth > this.computedWidth ? `${this.width}px` : '100%'

      const options = {
        staticClass: 'su-dialog',
        style: {
          width
        },
        directives: [
          {
            name: 'click-outside',
            value: this.onClickOutside
          }
        ]
      }

      if( this.computedMaxWidth && this.computedMaxWidth > 0 ) options.style.maxWidth = `${this.computedMaxWidth}px`

      return this.$createElement('div', options, this.$slots.default)
    },
    onClickOutside(e){
      if( !this.value || this.isActivatorNodeContains(e) ) return

      this.$emit('input', false)
    }
  },
  render(h){
    const options = {
      staticClass: 'su-dialog__attached'
    }

    const vnode = this.genContentWrap()
    this.dialogContentNode = vnode

    return h('div', options, [...this.genActivator(), vnode, this.genOverlay()])
  }
})