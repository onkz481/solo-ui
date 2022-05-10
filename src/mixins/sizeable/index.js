export default {
  props: {
    large: Boolean,
    small: Boolean
  },
  computed: {
    sizeableDefault(){
      return !this.large && !this.small;
    },
    sizeableClasses(){
      return {
        'su-size--small': this.small,
        'su-size--default': this.sizeableDefault,
        'su-size--large': this.large,
      };
    }
  }
}