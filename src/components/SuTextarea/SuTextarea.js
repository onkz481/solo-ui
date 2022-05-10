// components
import { SuTextField } from '../SuTextField'

export default SuTextField.extend({
  name: 'SuTextarea',
  props: {
    autoGrow: {
      type: Boolean,
      default: false
    },
    rowHeight: {
      type: [Number, String],
      default: 28,
      validator: v => !isNaN(parseFloat(v))
    },
    rows: {
      type: [Number, String],
      default: 5,
      validator: v => !isNaN(parseInt(v, 10))
    }
  },
  computed: {
    classes(){
      return [
        ...SuTextField.options.computed.classes.call(this),
        'su-textarea',
        {
          'su-textarea--auto-grow': this.autoGrow
        }
      ]
    },
    formStyles(){
      return {
        lineHeight: `${this.rowHeight}px`
      }
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.autoGrow && this.calculateTextareaHeight()
    })
  },
  methods: {
    calculateTextareaHeight(){
      const textarea = this.$refs.textarea
      if( !textarea ) return

      textarea.style.height = 0

      const rowsHeight = this.rows * this.rowHeight
      const scrollHeight = textarea.scrollHeight

      textarea.style.height = `${Math.max(rowsHeight, scrollHeight)}px`
    },
    genForm(){
      return SuTextField.options.methods.genForm.call(this, 'textarea', {
        rows: this.rows
      })
    },
    onInput(e){
      SuTextField.options.methods.onInput.call(this, e)

      this.autoGrow && this.calculateTextareaHeight()
    },
    onMousedown(e){
      this.$refs.textarea.focus()

      e.preventDefault()
    },
  }
})