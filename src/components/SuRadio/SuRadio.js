// mixins
import colorable from '../../mixins/colorable'
import { factory as GroupableFactory } from '../../mixins/groupable'
import { genInput, genInputSelection } from '../../mixins/selectable'

// components
import { SuItemBase } from '../SuItemGroup/SuItem'
import { SuInput } from '../SuInput'
import { SuIcon } from '../SuIcon'

export default SuItemBase.extend({
  name: 'SuRadio',
  mixins: [colorable, GroupableFactory('radioGroup')],
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    label: {
      type: String,
      default: undefined
    },
    offIcon: {
      type: String,
      default: 'radio_button_unchecked'
    },
    onIcon: {
      type: String,
      default: 'radio_button_checked'
    }
  },
  data: () => ({
    isFocus: false
  }),
  computed: {
    hasLabel(){
      return SuInput.options.computed.hasLabel.call(this)
    },
    computedId(){
      return SuInput.options.computed.computedId.call(this)
    }
  },
  methods: {
    genLabel(){
      return SuInput.options.methods.genLabel.call(this)
    },
    genRadio(){
      return genInputSelection(this, {}, [
        this.$createElement(SuIcon, {
          props: {
            color: this.isActive ? this.color : undefined
          }
        }, this.isActive ? this.onIcon : this.offIcon),
        genInput(this, 'checkbox')
      ])
    },
    onFocus(e){
      this.isFocus = true
      this.$emit('focus', e)
    },
    onBlur(e){
      this.isFocus = false
      this.$emit('blur', e)
    },
    onChange(){
      if( this.isActive ) return

      this.toggle()
    }
  },
  render(h){
    return h('div', {
      staticClass: 'su-radio',
      class: this.classes,
      on: Object.assign({
        click: this.onChange
      }, this.$listeners)
    }, [
      this.genRadio(),
      this.genLabel()
    ])
  }
})