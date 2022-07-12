// styles
import './SuRadioGroup.scss'

// components
import { SuItemGroupBase } from "../SuItemGroup/SuItemGroup"
import { SuInput } from "../SuInput"

export default SuItemGroupBase.extend({
  name: 'SuRadioGroup',
  mixins: [SuInput],
  provide(){
    return {
      radioGroup: this,
      isInRadioGroup: true
    }
  },
  props: {
    column: {
      type: Boolean,
      default: true
    },
    row: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes(){
      return [
        ...SuInput.options.computed.classes.call(this),
        {
          'su-radio-group--is-column': this.isColumn,
          'su-radio-group--is-row': this.isRow
        }
      ]
    },
    isColumn(){
      return ( !this.row && !this.column ) || this.column
    },
    isRow(){
      return !this.isColumn && this.row
    }
  },
  methods: {
    genDefaultSlot(){
      return this.$createElement('div', {
        staticClass: 'su-radio-group__input',
        attrs: {
          role: 'radiogroup'
        }
      }, [
        this.$slots.default
      ])
    }
  }
})