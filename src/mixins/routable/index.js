// mixins
import linkable from "../linkable"

// helpers
import { matchRoutePath, isGlobalLink } from "../../util/helpers"

import Vue from 'vue'

export default Vue.extend({
  name: 'Routable',
  mixins: [linkable],
  props: {
    activeClass: {
      type: String,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'div'
    },
    target: {
      type: String,
      default: undefined
    }
  },
  data: () => ({
    isActive: false,
    internalClass: ''
  }),
  computed: {
    classes(){
      return [
        (this.isActive && this.activeClass) && this.activeClass,
        (this.isActive && this.internalClass) && this.internalClass
      ]
    },
    isRouterLink(){
      return !!this.to && !!this.$router && !isGlobalLink(this.to)
    },
    styles(){
      return []
    }
  },
  watch: {
    $route: 'routeChange'
  },
  mounted(){
    this.routeChange()
  },
  methods: {
    genTag(){
      if( this.isRouterLink ) return 'router-link'

      if( this.to || this.href ) return 'a'

      return this.tag
    },
    genData(){
      const data = {
        attrs: {},
        props: {},
        class: this.classes,
        style: this.styles,
        [this.isRouterLink ? 'nativeOn' : 'on']: {
          ...this.$listeners,
          ...(this.click ? { click: this.click } : undefined)
        }
      }

      if( this.isRouterLink ){
        Object.assign(data.props, {
          to: this.to
        })
      } else if( this.to || this.href ) {
        data.attrs.href = this.href || this.to
      }

      if( this.target ) data.attrs.target = this.target

      return data
    },
    routeChange(){
      if( !this.to || !this.$route ) return

      this.$nextTick(() => {
        if( typeof this.to === 'string' ){
          this.isActive = this.routeMatch(this.to)
        }
      })
    },
    routeMatch(to){
      return matchRoutePath(to, this.$route.path)
    },
    toggle(){
      this.isActive = !this.isActive
    }
  }
})