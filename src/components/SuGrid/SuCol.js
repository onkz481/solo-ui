import Vue from 'vue'

export default Vue.extend({
  name: 'SuCol',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    alignSelf: {
      type: String,
      default: undefined
    },
    cols: {
      type: [String, Number],
      default: undefined
    }
  },
  computed: {
    classes(){
      return [
        'col',
        {
          [`align-self-${this.alignSelf}`]: this.alignSelf,
          [`col-${this.cols}`]: this.cols
        }
      ]
    }
  },
  render(h){
    return h(this.tag, {
      class: this.classes
    }, this.$slots.default)
  }
})