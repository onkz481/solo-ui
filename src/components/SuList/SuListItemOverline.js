import Vue from 'vue'

export default Vue.extend({
  name: 'SuListItemOverline',
  computed: {
    title(){
      return this.$slots.default[0].text;
    }
  },
  render(h){
    const content = h('span', {}, this.$slots.default)

    return h('div', {
      staticClass: 'su-list-item__overline',
      attrs: {
        title: this.title
      }
    }, [content])
  }
})