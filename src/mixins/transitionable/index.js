// Components
import {SuTransition} from "../../components/SuTransition"

export default {
  components: {
    SuTransition
  },
  props: {
    transition: {
      type: String,
      default: 'fade'
    }
  },
  methods: {
    genTransition(content){
      return this.$createElement(SuTransition, {
        props: {
          transition: this.transition
        }
      }, [content])
    }
  }
}