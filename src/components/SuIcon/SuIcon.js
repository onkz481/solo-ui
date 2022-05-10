// mixins
import colorable from '../../mixins/colorable'

import Vue from 'vue'

export default Vue.extend({
  name: 'SuIcon',
  mixins: [colorable],
  props: {
    color: {
      type: String,
      default: undefined
    },
    text: {
      type: Boolean,
      default: true
    },
    outlined: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isImg(){
      return this.$slots.default && this.$slots.default[0].tag === 'img'
    },
    classes(){
      return [
        this.colorableClasses,
        {
          'su-icon--is-disabled': this.disabled
        }
      ]
    },
    styles(){
      return [
        this.colorableInlines
      ]
    }
  },
  methods: {
    genIcon(){
      const tag = this.isImg ? 'div' : 'i'

      return this.$createElement(tag, {
        class: [
          this.isImg ? 'su-icon__img' : this.outlined ? 'material-icons-outlined' : 'material-icons'
        ],
      }, this.$slots.default)
    }
  },
  render(h){
    return h('span', {
      staticClass: 'su-icon',
      class: this.classes,
      style: this.styles
    }, [
      this.genIcon()
    ])
  }
})