const modelName = 'toggleValue'
const eventName = `update:${modelName}`

export default {
  name: 'toggleable',
  model: {
    prop: modelName,
    event: eventName
  },
  props: {
    [modelName]: {
      required: false
    }
  },
  data(){
    return {
      isActive: !!this[modelName]
    }
  },
  watch: {
    [modelName](val){
      this.isActive = !!val
    },
    isActive(val){
      !!val !== this[modelName] && this.$emit(eventName, val)
    }
  }
}