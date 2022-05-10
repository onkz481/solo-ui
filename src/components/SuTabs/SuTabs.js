// components
import { SuSlideGroupBase } from "../SuSlideGroup/SuSlideGroup"
import SuTabsSlider from "./SuTabsSlider"

// mixins
import colorable from "../../mixins/colorable"
import roundable from '../../mixins/roundable'

export default SuSlideGroupBase.extend({
  name: 'SuTabs',
  mixins: [colorable, roundable],
  props: {
    mandatory: {
      type: Boolean,
      default: true
    },
    activeClass: {
      type: String,
      default: 'su-tab--active'
    },
    shrink: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: String,
      default: 'none'
    },
    color: {
      type: String,
      default: 'primary'
    },
    text: {
      type: Boolean,
      default: true
    },
    sliderSize: {
      type: [Number, String],
      default: 2
    },
    sliderColor: {
      type: String,
      default: 'primary'
    },
    hideSlider: {
      type: Boolean,
      default: false
    }
  },
  provide(){
    return {
      tabsBar: this
    }
  },
  computed: {
    classes(){
      return [
        ...SuSlideGroupBase.options.computed.classes.call(this),
        'su-tabs',
        this.roundableClasses,
        this.colorableClasses,
        {
          'su-tabs--shrink': this.shrink
        }
      ]
    },
    sliderStyles(){
      const index = this.internalValue

      if( !this.items[index] || this.internalValue === null || typeof this.internalValue !== 'number' )
        return {}

      let left = 0
      for( let i = 0; i < index; i++ ){
        left = left + this.items[i].$el.clientWidth
      }

      return {
        width: `${this.items[index].$el.clientWidth}px`,
        height: `${this.sliderSize}px`,
        left: `${left}px`
      }
    }
  },
  methods: {
    genSlider(){
      if( this.hideSlider ) return
  
      return this.$createElement(SuTabsSlider, {
        props: {
          color: this.sliderColor
        },
        style: this.sliderStyles
      })
    },
    genContent(){
      const render = SuSlideGroupBase.options.methods.genContent.call(this, this.genSlider())

      return render
    }
  }
})