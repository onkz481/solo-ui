import Vue from 'vue'

// styles
import './SuTabs.scss'

// components
import { SuSlideGroupBase } from "../SuSlideGroup/SuSlideGroup"
import SuTabsBar from './SuTabsBar'
import SuTabsSlider from "./SuTabsSlider"

// mixins
import colorable from "../../mixins/colorable"
import roundable from '../../mixins/roundable'
import { generator as ModelableGenerator } from '../../mixins/modelable'

// helpers
import { isEmpty } from '../../util/helpers'

export default Vue.extend({
  name: 'SuTabs',
  mixins: [colorable, roundable, ModelableGenerator()],
  props: {
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
  data: () => ({
    sliderStyles: {
      width: 0,
      height: 0,
      left: 0
    },
  }),
  computed: {
    classes(){
      return [
        ...SuSlideGroupBase.options.computed.classes.call(this),
        'su-tabs',
        this.roundableClasses,
        {
          'su-tabs--shrink': this.shrink
        }
      ]
    },
    computedActiveClass(){
      return isEmpty(this.activeClass) ? 'su-tab--active' : this.activeClass
    }
  },
  watch: {
    sliderSize: 'setSliderStyles'
  },
  created(){
    if( isEmpty(this.internalValue) ) this.internalValue = 0
  },
  mounted(){
    this.$nextTick(() => {
      this.setSliderStyles()
    })
  },
  methods: {
    genBar(){
      let data = this.setTextColor({
        class: this.classes,
        props: {
          activeClass: this.computedActiveClass,
          mandatory: true,
          multiple: false,
          value: this.internalValue
        },
        on: {
          input: (val) => {
            this.internalValue = val
            
            this.setSliderStyles()
          }
        },
        ref: 'bar'
      })

      return this.$createElement(SuTabsBar, data, [
        this.genSlider(),
        ...this.$slots.default
      ])
    },
    genSlider(){
      if( this.hideSlider ) return
  
      return this.$createElement(SuTabsSlider, {
        props: {
          color: this.sliderColor,
          ...this.sliderStyles
        }
      })
    },
    setSliderStyles(){
      if( !this.$refs.bar ) return

      const index = this.internalValue
      const items = this.$refs.bar.items

      if( !items[index] || this.internalValue === null || typeof this.internalValue !== 'number' )
        this.sliderStyles = {}

      let left = 0
      for( let i = 0; i < index; i++ ){
        left = left + items[i].$el.clientWidth
      }
      
      this.sliderStyles = {
        width: items[index].$el.clientWidth,
        height: this.sliderSize,
        left: left
      }
    }
  },
  render(h){
    return h('div', {}, [
      this.genBar()
    ])
  }
})