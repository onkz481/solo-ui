// mixins
import modelable from '../../mixins/modelable'

import Vue from 'vue'

export const SuItemGroupBase = Vue.extend({
  mixins: [modelable],
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    activeClass: {
      type: String,
      default: 'su-item--active'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    mandatory: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    items: [],
    selectedItem: undefined,
  }),
  computed: {
    classes(){
      return [
        'su-item-group'
      ]
    },
    selectedItems(){
      return this.items.filter((item) => {
        return item.isActive
      })
    },
    selectedValues(){
      return this.selectedItems.map(item => {
        return this.getValue(item)
      })
    }
  },
  watch: {
    internalModelValue(val, old){
      if( Array.isArray(val) ){
        if( old && val.length > old.length ){
          this.selectedItem = this.items[ val.filter(val => old.indexOf(val) === -1)[0] ]
        } else {
          this.selectedItem = this.items[ old ? old.filter(old => val.indexOf(old) === -1)[0] : val[0] ]
        }
      } else {
        this.selectedItem = this.items[val]
      }
      
      this.updateItems()
    }
  },
  methods: {
    getValue(item){
      return item.value === undefined ? this.items.indexOf(item) : item.value
    },
    onChange(item){
      this.updateInternalValue(item)
    },
    register(item){
      this.items.push(item)

      item.$on('change', () => this.onChange(item))

      if( this.mandatory && !this.selectedItems.length ) this.updateMandatory()

      this.updateItem(item)
    },
    unregister(item){
      if( this._isDestroyed ) return

      const index = this.items.indexOf(item)

      this.items.splice(index, 1)

      if( !this.mandatory )
        return this.items[index] ? this.updateInternalValue(this.items[index]) : this.updateInternalValue(this.items[0])

      if( this.multiple && Array.isArray(this.internalValue) )
        this.updateMultiple()

      if( !this.selectedItems.length ){
        if( this.items.length ){
          this.updateItem(this.items[0])
        } else {
          this.internalValue = this.multiple ? [] : null
        }
      }
    },
    updateItem(item){
      if( Array.isArray(this.internalValue) ){
        item.isActive = item.value ? this.internalValue.includes(item.value) : this.internalValue.includes(this.items.indexOf(item))
      } else if( typeof this.internalValue === 'number' ) {
        item.isActive = this.items.indexOf(item) === this.internalValue
      } else if( item.value && typeof this.internalValue === 'string' ){
        item.isActive = this.internalValue === item.value
      } else {
        item.isActive = false
      }
    },
    updateItems(){
      this.$nextTick(() => {
        if( this.mandatory && !this.selectedItems.length ) this.updateMandatory()
        
        this.items.forEach(item => this.updateItem(item))
      })
    },
    updateMandatory(){
      if( !this.items.length ) return

      this.updateInternalValue(this.items[0])
    },
    updateInternalValue(item){
      this.multiple ? this.updateMultiple(item) : this.updateSingle(item)
    },
    updateMultiple(item){
      const values = this.internalValue ? this.internalValue.concat() : []

      const internalModelValue = this.items.filter((lItem, i) => {
        return (lItem === item) || values.includes(i)
      }).filter((lItem) => {
        return !values.includes(this.items.indexOf(item)) || (item !== lItem)
      }).map(item => {
        return this.items.indexOf(item)
      })

      if( this.mandatory && internalModelValue.length < 1 ) return

      this.internalValue = internalModelValue
    },
    updateSingle(item){
      const value = this.internalValue !== this.items.indexOf(item) ? this.getValue(item) : null
      
      if( this.mandatory && value === null ) return

      this.internalValue = value
    }
  },
  render(h){
    return h(this.tag, {
      class: this.classes
    }, this.$slots.default)
  }
})

export default SuItemGroupBase.extend({
  name: 'SuItemGroup',
  provide(){
    return {
      itemGroup: this
    }
  },
})