// mixins
import modelable from '../modelable'

import Vue from 'vue'

export default Vue.extend({
  name: 'Validatable',
  mixins: [modelable],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    errorCount: {
      type: [Number, String],
      default: 1
    },
    errorMessages: {
      type: [String, Array],
      default: () => []
    },
    messages: {
      type: [String, Array],
      default: () => []
    },
    rules: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    valid: false,
    validationErrorMessages: [],
  }),
  computed: {
    computedColor(){
      return this.validationState
    },
    hasError(){
      return this.error || this.internalErrorMessages.length > 0 || this.validationErrorMessages.length > 0
    },
    hasMessages(){
      return this.validationInternalMessages.length > 0
    },
    internalMessages(){
      return this.getInternalMessages(this.messages)
    },
    internalErrorMessages(){
      return this.getInternalMessages(this.errorMessages)
    },
    validationInternalMessages(){
      switch( true ){
        case this.internalErrorMessages.length > 0:
          return this.internalErrorMessages
        case this.validationErrorMessages.length > 0:
          return this.validationErrorMessages.slice(0, this.errorCount)
        case this.internalMessages.length > 0:
          return this.internalMessages
        default:
          return []
      }
    },
    validationMessages(){
      return this.validationInternalMessages.slice(0, this.errorCount)
    },
    validationState(){
      switch( true ){
        case this.disabled:
          return undefined
        case this.hasError:
          return 'error'
        default:
          return undefined
      }
    }
  },
  watch: {
    internalModelValue(){
      this.validate()
    }
  },
  mounted(){
    this.validate()
  },
  methods: {
    getInternalMessages(messages){
      if( !messages ) return []

      if( Array.isArray(messages) ) return messages
      else return [messages]
    },
    validate(){
      const validationErrorMessages = []
      let value = this.internalValue || false

      this.rules.forEach(rule => {
        const valid = typeof rule === 'function' ? rule(value) : rule

        if( valid === false || typeof valid === 'string' ) validationErrorMessages.push( valid || '' )
      })

      this.validationErrorMessages = validationErrorMessages
      this.valid = validationErrorMessages.length === 0

      this.$emit('valid', this.valid)

      return this.valid
    },
  }
})