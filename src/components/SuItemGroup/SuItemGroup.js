import Vue from 'vue'

// styles
import './SuItemGroup.scss'

// mixins
import { generator as ModelableGenerator } from '../../mixins/modelable'

// helpers
import { isEmpty, isNull, isNumber } from '../../util/helpers'

export const SuItemGroupBase = Vue.extend({
  mixins: [ModelableGenerator()],
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
        if( Array.isArray(old) && val.length > old.length ){
          if(val.length > old.length){
            this.selectedItem = this.getItem( val.filter(val => old.indexOf(val) === -1)[0] )
          } else {
            this.selectedItem = this.getItem( old.filter(old => val.indexOf(old) === -1)[0] )
          }
        }
      } else {
        this.selectedItem = this.getItem(val)
      }
      
      this.updateItems()
    },
    mandatory: 'updateMandatory',
    multiple: 'updateMultipleProp'
  },
  mounted(){
    this.$nextTick(() => {
      this.updateMultipleProp()
    })
  },
  methods: {
    getItem(val){
      if( isNumber(val) ) return this.items[val]

      return this.items.filter(item => item.value === val)[0]

    },
    getValue(item){
      if( !item ) return

      return item.value === undefined ? this.items.indexOf(item) : item.value
    },
    onChange(item){
      this.updateInternalValue(item)
    },
    register(item){
      this.items.push(item)

      item.$on('change', () => this.onChange(item))

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
      const { internalValue, items } = this

      if( Array.isArray(internalValue) ){
        item.isActive = internalValue.includes(this.getValue(item)) || internalValue.includes(items.indexOf(item))
      } else if( typeof internalValue === 'number' ) {
        item.isActive = items.indexOf(item) === internalValue
      } else if( item.value && typeof internalValue === 'string' ){
        item.isActive = internalValue === item.value
      } else {
        item.isActive = false
      }
    },
    updateItems(){
      this.$nextTick(() => {
        if( this.mandatory ) this.updateMandatory()
        
        this.items.forEach(item => this.updateItem(item))
      })
    },
    updateMandatory(){
      const { items, selectedItems, internalValue } = this

      if( items.length <= 0 ) return

      if( selectedItems.length > 0 || !isEmpty(internalValue) ) return

      this.updateInternalValue(this.items[0])
    },
    updateInternalValue(item){
      this.multiple ? this.updateMultiple(item) : this.updateSingle(item)
    },
    updateMultiple(item){
      const values = this.internalValue ? this.internalValue.concat() : []

      const internalValue = this.items.filter((lItem) => {
        return (lItem === item) || values.includes(this.getValue(lItem))
      }).filter((lItem) => {
        return !values.includes(this.getValue(item)) || (item !== lItem)
      }).map(item => {
        return this.getValue(item)
      })

      if( this.mandatory && internalValue.length < 1 ) return

      this.internalValue = internalValue
    },
    updateMultipleProp(){
      const { internalValue, multiple, selectedItem } = this

      if( multiple && Array.isArray(internalValue) ) return
      
      let value = internalValue

      if( multiple ){
        value = isNull(value) ? [] : [value]
      } else if( Array.isArray(value) && value.length > 0 ) {
        value = selectedItem ? this.getValue(selectedItem) : this.getValue(this.getItem(value[0]))
      }

      this.internalValue = value
    },
    updateSingle(item){
      const value = this.selectedItems.includes(item) ? null : this.getValue(item)
      
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