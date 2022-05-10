import Vue from 'vue'

export default Vue.extend({
  name: 'SuMain',
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
    mainStyles(){
      return [
        {
          'margin': this.$soloui.layout.mobile ? `0 ${this.$soloui.layout.gutter}px` : undefined,
          'width': this.$soloui.layout.mobile ? `calc(100% - ${this.$soloui.layout.gutter * 2}px)` : undefined,
        }
      ]
    },
    layoutStyles(){
      return [
        {
          'width': this.$soloui.layout.mobile ? '100%' : `${this.$soloui.layout.main.width}px`
        }
      ]
    },
    centerStyles(){
      return [
        {
          'width': this.$soloui.layout.mobile ? '100%' : `${this.hasLayoutRight ? this.$soloui.layout.main.centerWidth : this.$soloui.layout.main.width}px`
        }
      ]
    },
    rightStyles(){
      return [
        {
          'width': `${this.$soloui.layout.main.rightWidth}px`
        }
      ]
    },
    rightInnerStyles(){
      return [
        ...this.rightStyles,
        {
          'position': this.fixedRight ? 'fixed' : undefined
        }
      ]
    }
  },
  methods: {
    genLayout(){
      return this.$createElement('div', {
        staticClass: 'su-main__layout',
        style: this.layoutStyles
      }, [
        this.genLayoutCenter(),
        this.genLayoutRight()
      ])
    },
    genLayoutCenter(){
      return this.$createElement('div', {
        staticClass: 'su-main__layout-center',
        style: this.centerStyles
      }, this.$slots.default)
    },
    genLayoutRight(){
      if( !this.$soloui.breakpoint.mdUp || !this.hasLayoutRight ) return

      return this.$createElement('div', {
        staticClass: 'su-main__layout-right',
        style: this.rightStyles
      }, [
        this.genLayoutRightInner()
      ])
    },
    genLayoutRightInner(){
      return this.$createElement('div', {
        staticClass: 'su-main__layout-right-inner',
        style: this.rightInnerStyles
      }, this.$slots.right)
    },
  },
  render(h){
    return h('div', {
      staticClass: 'su-main',
      style: this.mainStyles
    }, [
      this.genLayout()
    ])
  }
})