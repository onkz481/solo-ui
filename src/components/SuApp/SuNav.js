// styles
import './SuNav.scss'

// components
import SuSheet from '../SuSheet'
import { SuCard } from '../SuCard'
import { SuTransition } from '../SuTransition'

// mixins
import themeable from '../../mixins/themeable'
import { inject as RegistrableInject } from '../../mixins/registrable'

// directives
import ClickOutside from '../../directives/ClickOutside'

import Vue from 'vue'

export default Vue.extend({
  name: 'SuNav',
  inject: {
    application: {
      default: null
    }
  },
  directives: {
    ClickOutside
  },
  mixins: [RegistrableInject('application'), themeable],
  provide(){
    return {
      isInNav: true
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    drawer: false,
  }),
  computed: {
    isDrawer(){
      return this.$soloui.layout.mobile && this.drawer
    },
    rootClasses(){
      return [
        'su-nav',
        this.themeableClass,
        {
          'su-nav--is-narrow': this.$soloui.layout.narrow
        }
      ]
    },
    rootStyles(){
      return [
        {
          'margin-right': `${this.$soloui.layout.gutter}px`
        }
      ]
    },
    innerStyles(){
      return [
        {
          'width': `${this.$soloui.layout.nav.width}px`
        }
      ]
    },
    scrollStyles(){
      return [
        {
          'width': `${this.$soloui.layout.nav.gutterWidth}px`
        }
      ]
    }
  },
  watch: {
    value(){
      this.drawer = this.value
    }
  },
  created(){
    this.application.register('nav', this)
  },
  mounted(){
    this.drawer = this.value
  },
  methods: {
    genWrapper(){
      return this.$createElement('div', {
        class: this.rootClasses,
        style: this.rootStyles
      }, [
        this.genInner()
      ])
    },
    genInner(){
      return this.$createElement('div', {
        staticClass: 'su-nav-inner-w',
        style: this.innerStyles
      }, [
        this.genFixed()
      ])
    },
    genFixed(){
      return this.$createElement('div', {
        staticClass: 'su-nav__fixed',
        style: {
          top: `${this.$soloui.layout.header.height}px`,
          height: `calc(100vh - ${this.$soloui.layout.header.height}px)`
        }
      }, [
        this.genScroll()
      ])
    },
    genScroll(){
      return this.$createElement('div', {
        staticClass: 'su-nav__scroll',
        style: this.scrollStyles
      }, [
        this.genScrollInner()
      ])
    },
    genScrollInner(){
      const content = this.$createElement(SuCard, {}, this.$slots.default)

      return this.$createElement('div', {
        staticClass: 'su-nav__scroll-inner',
        style: this.innerStyles
      }, [
        content
      ])
    },
    genTransition(item){
      return this.$createElement(SuTransition, {
        props: {
          transition: 'drawer-default'
        }
      }, [item])
    },
    genDrawer(){
      const drawer = this.$createElement(SuSheet, {
        staticClass: 'su-nav-drawer',
        style: this.innerStyles,
        props: {
          elevation: 16,
          rounded: 'none'
        },
        directives: [
          {
            name: 'show',
            value: this.isDrawer
          },
          {
            name: 'click-outside',
            value: this.onClickOutside
          }
        ]
      }, this.$slots.default)

      return this.genTransition(drawer)
    },
    onClickOutside(){
      this.drawer = false
      this.$emit('input', false)
    }
  },
  render(){
    const render = this.$soloui.layout.mobile ? this.genDrawer() : this.genWrapper()

    return render
  }
})