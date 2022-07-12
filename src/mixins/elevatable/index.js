export default {
  props: {
    elevation: {
      type: [Number, String],
      default: undefined
    }
  },
  computed: {
    isElevation(){
      return this.elevation !== undefined && (this.elevation >= 0 && this.elevation <= 24);
    },
    elevatableClasses(){
      return {
        [`elevation-${this.elevation}`]: this.isElevation
      }
    }
  }
}