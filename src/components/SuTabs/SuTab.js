import { SuItemBase } from '../SuItemGroup/SuItem'

//mixins
import themeable from '../../mixins/themeable'
import { factory as GroupableFactory } from '../../mixins/groupable'

export default SuItemBase.extend({
  name: 'SuTab',
  mixins: [themeable, GroupableFactory('tabsBar', 'su-tab', 'su-tabs')],
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  computed: {
    classes(){
      return [
        ...SuItemBase.options.computed.classes.call(this),
        'su-tab',
        this.themeableClass
      ]
    }
  },
  methods: {
    genWrapper(){
      return this.$createElement('div', {
        staticClass: 'su-tab__content',
        on: {
          click: this.toggle
        }
      }, [this.genContent()])
    },
    genContent(){
      return this.$createElement('div', {
        staticClass: 'su-tab__content-inner',
      }, this.$slots.default)
    },
  },
  render(h){
    return h(this.tag, {
      class: this.classes
    }, [this.genWrapper()])
  }
})