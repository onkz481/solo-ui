// components
import { SuItemGroupBase } from "../SuItemGroup/SuItemGroup"
import { SuInput } from "../SuInput"

export default SuItemGroupBase.extend({
  name: 'SuRadioGroup',
  mixins: [SuInput],
  provide(){
    return {
      radioGroup: this
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
          'su-radio-group--is-column': !this.row && this.column,
          'su-radio-group--is-row': this.row
        }
      ]
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
        this.genSlot('prepend', 'inner'),
        this.$slots.default,
        this.genSlot('append', 'inner')
      ])
    }
  }
})