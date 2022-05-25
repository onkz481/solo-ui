// components
import { SuImg } from '../SuImg'

// mixins
import themeable from '../../mixins/themeable'

// helpers
import { assignProps } from '../../util/helpers'

import Vue from 'vue'

export default Vue.extend({
  name: 'SuApp',
  mixins: [themeable, SuImg],
  provide(){
    return {
      application: this
    }
  },
  props: {
    id: {
      type: String,
      default: 'app'
    },
    background: {
      type: [String, Object],
      default: undefined
    }
  },
  data: () => ({
    header: null,
    nav: null
  }),
  computed: {
    classes(){
      return [
        this.themeableClass
      ]
    },
    hasHeader(){
      return !!this.header
    },
    hasNav(){
      return !!this.nav
    }
  },
  methods: {
    genImg(){
      if( !this.src ) return

      const imgProps = assignProps(this, SuImg)

      return this.$createElement(SuImg, {
        props: imgProps,
      })
    },
    genWrapper(){
      return this.$createElement('div', {
        staticClass: 'su-app__wrapper'
      }, this.$slots.default)
    },
    genAbsolutedWrapper(){
      const inner = this.$createElement('div', {
        staticClass: 'su-app-absoluted__inner'
      })

      return this.$createElement('div', {
        staticClass: 'su-app-absoluted__wrapper'
      }, [inner])
    },
    register(target, node){
      this[target] = node
    }
  },
  render(h){
    return h('div', {
      staticClass: 'su-app',
      class: this.classes,
      attrs: {
        id: this.id,
      }
    }, [
      this.genImg(),
      this.genWrapper(),
      this.genAbsolutedWrapper()
    ])
  }
})