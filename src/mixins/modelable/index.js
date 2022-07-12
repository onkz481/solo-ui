export default {
  name: 'modelable',
  model: {
    prop: 'modelValue',
    event: 'input'
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

        this.$emit('input', val)
      }
    }
  },
  watch: {
    modelValue(val){
      this.internalModelValue = val
    }
  }
}

import Vue from 'vue'

export function generator(
  prop = 'value', event = 'input',
  { type, defaultValue, required } = { type: undefined, defaultValue: undefined, required: false }
){
  return Vue.extend({
    model: {
      prop,
      event
    },
    props: {
      [prop]: {
        type,
        default: defaultValue,
        required
      }
    },
    data(){
      return {
        internalModelValue: this[prop],
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

          this.$emit(event, val)
        }
      }
    },
    watch: {
      [prop](val){
        this.internalValue = val
      }
    }
  })
}