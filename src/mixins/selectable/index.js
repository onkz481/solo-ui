// components
import { SuInput } from '../../components/SuInput'
import { SuLabel } from '../../components/SuLabel'

export function genInput(vm, type){
  return vm.$createElement('input', {
    attrs: {
      'aria-checked': vm.isActive.toString(),
      id: vm.inputId,
      type: type,
      role: type
    },
    domProps: {
      value: vm.value,
      checked: vm.isActive
    },
    ref: 'input'
  })
}

export function genInputSelection(vm, options = {}, slot){
  return vm.$createElement('div', Object.assign({
    staticClass: 'su-input--selection__input'
  }, options), slot)
}

export default SuInput.extend({
  name: 'selectable',
  props: {
    value: {
      required: false
    }
  },
  computed: {
    isMultiple(){
      return Array.isArray(this.internalValue)
    },
    isActive(){
      const value = this.value
      const modelValue = this.internalValue

      if( this.isMultiple ){
        if( !Array.isArray(modelValue) ) return false

        return modelValue.includes(value)
      }

      return typeof modelValue === 'boolean' ? modelValue : false
    }
  },
  methods: {
    genLabel(){
      if( !this.hasLabel ) return

      return this.$createElement(SuLabel, {
        attrs: {
          for: this.computedId
        },
        ref: 'label'
      }, this.$slots.label || this.label)
    },
    genInput(type){
      return genInput(this, type)
    },
    onClick(e){
      this.onChange()
      this.$emit('click', e)
    },
    onFocus(e){
      this.isFocus = true
      this.$emit('focus', e)
    },
    onBlur(e){
      this.isFocus = false
      this.$emit('blur', e)
    },
    onChange(){
      const value = this.value
      let modelValue = this.internalValue

      if( this.isMultiple ){
        if( !Array.isArray(modelValue) ) modelValue = []

        modelValue.includes(value) ?
          modelValue = modelValue.filter(item => item !== value) :
          modelValue.push(value)
      } else {
        modelValue = typeof modelValue === 'boolean' ? !modelValue : true
      }

      this.internalValue = modelValue
    }
  }
})