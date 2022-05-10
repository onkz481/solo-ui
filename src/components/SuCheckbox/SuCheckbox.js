// mixins
import selectable, { genInput, genInputSelection } from '../../mixins/selectable'

// components
import { SuIcon } from '../SuIcon'

export default selectable.extend({
  name: 'SuCheckbox',
  props: {
    offIcon: {
      type: String,
      default: 'check_box_outline_blank'
    },
    onIcon: {
      type: String,
      default: 'check_box'
    }
  },
  methods: {
    genCheckbox(){
      return genInputSelection(this, {}, [
        this.$createElement(SuIcon, {
          props: {
            color: this.isActive ? this.color : undefined
          }
        }, this.isActive ? this.onIcon : this.offIcon),
        genInput(this, 'checkbox')
      ])
    },
    genDefaultSlot(){
      return [
        this.genCheckbox(),
        this.genLabel()
      ]
    }
  }
})