import Vue from 'vue'

// styles
import './SuMain.scss'

// directives
import Scroll from '../../directives/Scroll'

export default Vue.extend({
  name: 'SuMain',
  inject: ['application'],
  directives: {
    Scroll
  },
  data(){
    const layoutRightTop = this.$soloui.layout.header.height

    return {
      layoutRightTop
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
    }
  },
  mounted(){
    this.onScroll()
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
          width: `${this.$soloui.layout.main.right}px`
        }
      }, [
        this.genLayoutRightInner()
      ])
    },
    genLayoutRightInner(){
      return this.$createElement('div', {
        staticClass: 'su-main__layout-right-inner',
        style: {
          top: `${this.layoutRightTop}px`,
          width: `${this.$soloui.layout.main.right}px`,
        },
        directives: [
          {
            name: 'scroll',
            value: this.onScroll,
          }
        ]
      }, this.$slots.right)
    },
    onScroll(e, el){
      if( !el ) return

      let top = this.$soloui.layout.header.height

      if( el.clientHeight < document.documentElement.clientHeight - top ){
        this.layoutRightTop = top

        return
      }

      top = (top + el.clientHeight - window.scrollY) > document.documentElement.clientHeight ? 
        top - window.scrollY : 
        document.documentElement.clientHeight - el.clientHeight

      this.layoutRightTop = top
    }
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