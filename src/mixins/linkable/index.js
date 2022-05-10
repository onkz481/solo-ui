export default {
  name: 'linkable',
  props: {
    to: {
      type: [String, Object],
      default: undefined
    },
    link: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isLink(){
      return Boolean(this.to || this.link)
    },
    isClickable(){
      if(this.disabled) return false
      
      return Boolean(
        this.isLink ||
        this.$listeners.click
      )
    }
  }
}