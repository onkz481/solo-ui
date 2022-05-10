// Components
import SuOverlay from "../../components/SuOverlay/SuOverlay"

export default {
  components: {
    SuOverlay
  },
  props: {
    hideOverlay: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    genOverlay(){
      if( this.hideOverlay ) return

      return this.$createElement('su-overlay', {
        props: {
          value: this.value
        }
      })
    }
  }
}