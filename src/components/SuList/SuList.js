// styles
import './SuList.scss'

// components
import SuSheet from '../SuSheet'

export default SuSheet.extend({
  name: 'SuList',
  provide(){
    return {
      isInList: true,
      list: this
    }
  },
  props: {
    shrink: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    groups: [],
  }),
  computed: {
    classes(){
      return [
        ...SuSheet.options.computed.classes.call(this),
        {
          'su-list--is-shrink': this.shrink
        }
      ];
    }
  },
  methods: {
    register(item){
      this.groups.push(item)
    },
    unregister(item){
      this.groups = this.groups.filter(group => group !== item)
    },
    listClick(uid){
      this.groups.forEach(group => {
        group.toggle(uid)
      })
    }
  },
  render(h){
    return h(this.tag, this[this.text ? 'setTextColor' : 'setBackgroundColor']({
      staticClass: 'su-list',
      class: this.classes
    }), this.$slots.default)
  }
})