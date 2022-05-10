export default {
  name: 'modelable',
  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  },
  props: {
    modelValue: {
      required: false
    }
  },
  data(){
    return {
      internalModelValue: this.modelValue,
    }
  },
  computed: {
    internalValue: {
      get(){
        return this.internalModelValue
      },
      set(val){
        if( val === this.internalModelValue ) return

        this.internalModelValue = val

        this.$emit('update:modelValue', val)
      }
    }
  },
  watch: {
    modelValue(val){
      this.internalModelValue = val
    }
  }
}