import Vue from 'vue'

export default Vue.extend({
  name: 'SuRow',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    align: {
      type: String,
      default: undefined
    },
    justify: {
      type: String,
      default: undefined
    },
    noGutters: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes(){
      return [
        'row',
        {
          [`align-${this.align}`]: this.align,
          [`justify-${this.justify}`]: this.justify,
          'no-gutters': this.noGutters
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