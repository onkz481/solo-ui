import Vue from 'vue'

export default Vue.extend({
  props: {
    theme: {
      type: String,
      default: undefined
    }
  },
  computed: {
    computedTheme(){
      return this.$soloui.theme.themes.includes(this.theme) ? this.theme : this.$soloui.theme.current
    },
    themeableClass(){
      return `theme--${this.computedTheme}`
    }
  }
})