import Vue from 'vue'

export default Vue.extend({
  name: 'SuMain',
  inject: ['application'],
  props: {
    fixedRight: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hasLayoutRight(){
      return this.$slots.right
    },
    hasHeader(){
      return this.application && this.application.hasHeader
    },
    hasNav(){
      return this.application && this.application.hasNav
    },
    styles(){
      return {
        margin: this.$soloui.layout.mobile ? `0 ${this.$soloui.layout.gutter}px` : undefined,
        width: this.$soloui.layout.mobile ? `calc(100% - ${this.$soloui.layout.gutter * 2}px)` : undefined,
        paddingTop: this.hasHeader ? `${this.$soloui.layout.header.height}px` : undefined,
        justifyContent: this.hasNav ? 'flex-start' : undefined,
      }
    },
    calcMainLayout(){
      const layout = this.$soloui.layout
      if( layout.mobile ) return '100%'

      return this.hasNav ?
        `${layout.main.width}px` :
        `${layout.app.width}px`
    },
    calcMainLayoutCenter(){
      const layout = this.$soloui.layout
      
      if( layout.mobile || !this.hasLayoutRight ) return '100%'
      if( !this.$soloui.breakpoint.mdUp ) return '100%'
      
      return this.hasNav ?
        `${layout.main.center}px` :
        `${layout.app.width - layout.main.right - layout.gutter}px`
    },
    calcMainLayoutRight(){
      return `${this.$soloui.layout.main.right}px`
    }
  },
  methods: {
    genLayout(){
      return this.$createElement('div', {
        staticClass: 'su-main__layout',
        style: {
          width: this.calcMainLayout
        }
      }, [
        this.genLayoutCenter(),
        this.genLayoutRight()
      ])
    },
    genLayoutCenter(){
      return this.$createElement('div', {
        staticClass: 'su-main__layout-center',
        style: {
          width: this.calcMainLayoutCenter
        }
      }, this.$slots.default)
    },
    genLayoutRight(){
      if( !this.$soloui.breakpoint.mdUp || !this.hasLayoutRight ) return

      return this.$createElement('div', {
        staticClass: 'su-main__layout-right',
        style: {
          width: this.calcMainLayoutRight
        }
      }, [
        this.genLayoutRightInner()
      ])
    },
    genLayoutRightInner(){
      return this.$createElement('div', {
        staticClass: 'su-main__layout-right-inner',
        style: {
          width: this.calcMainLayoutRight,
          position: this.fixedRight ? 'fixed' : undefined
        }
      }, this.$slots.right)
    },
  },
  render(h){
    return h('div', {
      staticClass: 'su-main',
      style: this.styles
    }, [
      this.genLayout()
    ])
  }
})