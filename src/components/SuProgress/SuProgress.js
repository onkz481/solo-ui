import Vue from 'vue'

// styles
import './SuProgress.scss'

// mixins
import colorable from '../../mixins/colorable'
import { generator as ModelableGenerator } from '../../mixins/modelable'

// helpers
import { getSlot, isNumber } from '../../util/helpers'
import { isColor, isCssColor } from '../../util/colorHelpers'

export default Vue.extend({
  name: 'SuProgress',
  mixins: [
    colorable,
    ModelableGenerator('value', 'input', {type: Number, defaultValue: 0}),
  ],
  props: {
    backgroundColor: {
      type: String,
      default: undefined
    },
    backgroundOpacity: {
      type: [Number, String],
      default: 0.3
    },
    color: {
      type: String,
      default: 'primary'
    },
    indeterminate: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    backgroundStyles(){
      return {
        opacity: this.computedBackgroundOpacity
      }
    },
    classes(){
      return [
        'su-progress'
      ]
    },
    computedBackgroundColor(){
      return isColor(this.backgroundColor) || isCssColor(this.backgroundColor) ? this.backgroundColor : this.computedColor
    },
    computedBackgroundOpacity(){
      return isNumber( this.backgroundOpacity ) ? this.backgroundOpacity : 0.3
    },
    computedColor(){
      return this.isColor( this.color ) ? this.color : 'primary'
    },
    computedValue(){
      let value = this.internalValue
      
      if( value < 0 ) value = 0
      if( value > 100 ) value = 100

      return value
    },
    defaultSlotProps(){
      return {
        color: this.computedColor,
        value: this.indeterminate ? 'indeterminate' : this.computedValue
      }
    },
    styles(){
      return []
    }
  },
  methods: {
    genBackground(){
      return this.$createElement('div', this.setBackgroundColor({
        class: [
          'su-progress__background'
        ],
        style: [
          this.backgroundStyles
        ]
      }, this.computedBackgroundColor))
    },
    genContent(){
      return [
        this.genBackground(),
        this.genDefaultSlot()
      ]
    },
    genDefaultSlot(){
      return this.$createElement('div', {
        staticClass: 'su-progress__default-slot'
      }, [
        getSlot(this, 'default', this.defaultSlotProps)
      ])
    }
  },
  render(h){
    return h('div', {
      class: this.classes,
      style: this.styles,
      attrs: {
        role: 'progressbar',
        'aria-valuenow': this.computedValue,
        'aria-valuemin': 0,
        'aria-valuemax': 100
      }
    }, this.genContent())
  }
})