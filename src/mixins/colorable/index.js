export default {
  props: {
    color: {
      type: String,
      default: undefined,
      required: false
    },
    text: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    colorableClasses(){
      if( !this.color ) return

      return this.hasBg ? this.color : `${this.color}--text`
    },
    colorableInlines(){
      return this.color && this.isCssColor ? 
        this.hasBg ? {
          'background-color': this.color,
          'border-color': this.color
        } : {
          'color': this.color,
          'border-color': this.color
        } : undefined;
    },
    hasBg(){
      return !this.text;
    },
    isCssColor(){
      return !!this.color.match(/^(#|var\(--|(rgb|hsl)a?\()/);
    }
  }
}