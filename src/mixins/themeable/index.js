import Vue from 'vue'

export default Vue.extend({
  name: 'Themeable',

  props: {
    theme: {
      type: String,
      default: undefined
    }
  },

  computed: {
    themeableClass(){
      const themeClass = `theme--${this.theme ? this.theme : this.$soloui.theme.current}`

      return themeClass
    }
  },
})