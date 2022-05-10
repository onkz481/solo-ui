import Vue from 'vue'

export default Vue.extend({
  name: 'SuListItemSubtitle',
  computed: {
    title(){
      return this.$slots.default[0].text;
    }
  },
  render(h){
    const content = h('span', {}, this.$slots.default)

    return h('div', {
      staticClass: 'su-list-item__subtitle',
      attrs: {
        title: this.title
      }
    }, [content])
  }
})
