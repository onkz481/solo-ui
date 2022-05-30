// styles
import './SuCheckbox.scss'

// mixins
import selectable, { genInput, genInputSelection } from '../../mixins/selectable'

// components
import { SuIcon } from '../SuIcon'

export default selectable.extend({
  name: 'SuCheckbox',
  props: {
    offIcon: {
      type: String,
      default: 'mdi-checkbox-blank-outline'
    },
    onIcon: {
      type: String,
      default: 'mdi-checkbox-outline'
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