import colorable from '../colorable';

export default {
  mixins: [colorable],
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    text: {
      type: Boolean,
      default: true
    },
    hint: {
      type: [Array, String],
      default: undefined
    },
    rules: {
      type: Array,
      default: () => []
    },
    error: {
      type: Boolean,
      default: false
    },
    errorCount: {
      type: [Number, String],
      default: 1
    },
    hideDetails: {
      type: [Boolean, String],
      default: 'auto'
    },
    prependIcon: {
      type: String,
      default: undefined
    },
    prependOuterIcon: {
      type: String,
      default: undefined
    },
    appendIcon: {
      type: String,
      default: undefined
    },
    appendOuterIcon: {
      type: String,
      default: undefined
    }
  },
  methods: {
    inputableProps(value){
      return Object.assign({
        hint: this.hint,
        rules: this.rules,
        error: this.error,
        errorCount: this.errorCount,
        hideDetails: this.hideDetails,
        prependIcon: this.prependIcon,
        prependOuterIcon: this.prependOuterIcon,
        appendIcon: this.appendIcon,
        appendOuterIcon: this.appendOuterIcon
      }, value);
    },
    inputableListeners(value){
      let listeners = {}
      
      let propListeners = Object.keys(this.$listeners)
      if(propListeners.length > 0){
        let pattern = /^click:.*$/

        propListeners.forEach(key => {
          if( pattern.test(key) ) listeners[key] = this.$listeners[key]
        })
      }

      return Object.assign(listeners, value)
    }
  }
}