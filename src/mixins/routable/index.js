// mixins
import linkable from "../linkable"

// helpers
import { matchRoutePath } from "../../util/helpers"

import Vue from 'vue'

export default Vue.extend({
  name: 'Routable',
  mixins: [linkable],
  props: {
    activeClass: {
      type: String,
      default: undefined
    },
    tag: {
      type: String,
      default: 'div'
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
    isRoute(){
      return !!this.$router && !!this.to
    }
  },
  watch: {
    $route: 'routeChange'
  },
  mounted(){
    this.routeChange()
  },
  methods: {
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