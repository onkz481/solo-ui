export default {
  props: {
    rounded: {
      type: String,
      default: undefined,
      required: false
    },
    tile: {
      type:Boolean,
      default: false
    }
  },
  computed: {
    roundableClasses(){
      if( this.tile ) {
        return 'rounded-none'
      } else {
        return this.rounded && ['none', 'small', 'normal', 'medium', 'large'].includes(this.rounded) ? 
        `rounded-${this.rounded}` : undefined;
      }
    }
  }
}