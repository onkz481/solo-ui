// components
import { SuImg } from '../SuImg'

// helpers
import { assignProps } from '../../util/helpers'

import Vue from 'vue'

export default Vue.extend({
  name: 'SuApp',
  mixins: [SuImg],
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
    isDark: false,
  }),
  computed: {
    classes(){
      return [
        this.isDark ? 'su-app--dark' : 'su-app--light'
      ]
    }
  },
  mounted(){
    this.$nextTick(this.initialize())
  },
  methods: {
    initialize(){
      //-- ダークモードの判定
      this.isDark = (window.matchMedia('(prefers-color-scheme: dark)').matches == true) ? true : false
    },
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
      }, inner)
    }
  },
  render(h){
    return h('div', {
      staticClass: 'su-app',
      class: this.classes,
      attrs: {
        id: this.id
      }
    }, [
      this.genImg(),
      this.genWrapper(),
      this.genAbsolutedWrapper()
    ])
  }
})