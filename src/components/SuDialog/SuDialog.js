import Vue from 'vue'

// Mixins
import activitable from '../../mixins/activatable'
import dimensionable from '../../mixins/dimensionable'
import overlayable from '../../mixins/overlayable';
import transitionable from '../../mixins/transitionable';

// Directives
import ClickOutside from '../../directives/ClickOutside';

// helpers
import { insertBefore } from '../../util/helpers'

export default Vue.extend({
  name: 'SuDialog',
  directives: {
    ClickOutside
  },
  mixins: [activitable, dimensionable, overlayable, transitionable],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    dialogContentNode: null
  }),
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

      const options = {
        staticClass: 'su-dialog',
        style: [
          {
            width: this.getAppAbsolutedInnerWidth()
          }
        ],
        directives: [
          {
            name: 'click-outside',
            value: this.onClickOutside
          }
        ]
      }

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