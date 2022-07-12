// styles
import './SuRadio.scss'

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
  inject: {
    isInRadioGroup: {
      default: false
    }
  },
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
      default: 'mdi-radiobox-blank'
    },
    onIcon: {
      type: String,
      default: 'mdi-radiobox-marked'
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
      this.isInRadioGroup ? this.toggle() : this.isActive = !this.isActive
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