// mixins
import { factory as GroupableFactory } from '../../mixins/groupable'

// utils
import { getSlot } from '../../util/helpers'

import Vue from 'vue'

export const SuItemBase = Vue.extend({
  props: {
    activeClass: {
      type: String,
      default: 'su-item--active'
    },
    value: {
      type: [String, Number, Object, Boolean],
      default: undefined
    }
  },
  computed: {
    classes(){
      return [
        'su-item',
        {
          [this.getActiveClass]: this.isActive,
          'su-item--is-active': this.isActive
        }
      ]
    },
  },
  methods: {
    toggle(){
      this.isActive = !this.isActive
    }
  },
  render(){
    let elem = getSlot(this, 'default', {
      active: this.isActive,
      toggle: this.toggle
    })[0]

    elem.data =  this._b(elem.data || {}, elem.tag, {
      class: this.classes,
    })

    return elem
  }
})

export default SuItemBase.extend({
  name: 'SuItem',
  mixins: [
    GroupableFactory('itemGroup', 'su-item', 'su-item-group')
  ]
})