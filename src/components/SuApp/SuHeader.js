// styles
import './SuHeader.scss'

// components
import { SuAppbar } from '../SuAppbar'

export default SuAppbar.extend({
  name: 'SuHeader',
  inject: {
    application: {
      default: null
    }
  },
  mixins: [SuAppbar],
  props: {
    elevation: {
      type: Number,
      default: 0
    }
  },
  computed: {
    innerStyles(){
      return {
        'width': this.$soloui.layout.mobile ? '100%' : `${this.$soloui.layout.header.width}px`,
        'padding': this.$soloui.layout.mobile ? `0 ${this.$soloui.layout.gutter}px` : undefined
      }
    }
  },
  created(){
    this.application.register('header', this)
  },
  methods: {
    genWrapper(){
      return this.$createElement('div', {
        staticClass: 'su-header__wrapper'
      }, [
        this.genInner()
      ])
    },
    genInner(){
      return this.$createElement('div', {
        staticClass: 'su-header__inner',
        style: this.innerStyles
      }, [
        this.genContent()
      ])
    },
    genContent(){
      return this.$createElement(this.tag, {
        class: this.classes,
        style: this.styles
      }, this.$slots.default)
    }
  },
  render(h){
    return h('div', {
      staticClass: 'su-header',
      class: [
        this.themeableClass
      ],
      style: {
        height: `${this.$soloui.layout.header.height}px`,
        paddingBottom: `${this.$soloui.layout.gutter}px`
      }
    }, [
      this.genWrapper()
    ])
  }
})