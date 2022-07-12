import Vue from 'vue'

export default Vue.extend({
  name: 'SuContainer',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    fluid: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes(){
      return [
        this.fluid ? 'container-fluid' : 'container'
      ]
    }
  },
  render(h){
    return h(this.tag, {
      class: this.classes
    }, this.$slots.default)
  }
})