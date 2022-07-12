// styles
import './SuProgressCircle.scss'

// components
import SuProgress from "./SuProgress"

// helpers
import { insertCssKeyframes, isNumber } from '../../util/helpers'

export default SuProgress.extend({
  name: 'SuProgressCircle',
  props: {
    backgroundColor: {
      type: String,
      default: 'secondary'
    },
    color: {
      type: String,
      default: 'primary'
    },
    indeterminateBezier: {
      type: String,
      default: 'cubic-bezier(0.65, 0, 0.35, 1)'
    },
    indeterminateDasharray: {
      type: [String, Number],
      default: undefined
    },
    indeterminateDuration: {
      type: [String, Number],
      default: 2
    },
    linecap: {
      type: String,
      default: undefined
    },
    rotate: {
      type: [String, Number],
      default: 0
    },
    size: {
      type: [String, Number],
      default: 36
    },
    width: {
      type: [String, Number],
      default: 4
    },
  },
  computed: {
    classes(){
      return [
        ...SuProgress.options.computed.classes.call(this),
        'su-progress-circle'
      ]
    },
    calcCircumference(){
      return (this.calcRadius * 2) * 3.14
    },
    calcRadius(){
      const { computedSize, computedWidth } = this

      const size = (computedSize / 2) - (computedWidth / 2)

      return size > 0 ? size : 0
    },
    computedIndeterminateDasharray(){
      return isNumber(this.indeterminateDasharray) ? this.indeterminateDasharray : this.calcCircumference / 16
    },
    computedIndeterminateDuration(){
      return isNumber(this.indeterminateDuration) && this.indeterminateDuration > 0 ? this.indeterminateDuration : 2
    },
    computedRotate(){
      const { rotate } = this

      return isNumber(rotate) ? rotate : 0
    },
    computedSize(){
      const { size } = this

      return isNumber(size) && size > 0 ? size : 36
    },
    computedWidth(){
      const { width } = this
      
      return isNumber(width) && width > 0 ? width : 4
    }
  },
  methods: {
    genBackground(){
      if( this.indeterminate ) return

      const circle = this.genCircle()

      circle.data.class = [
        circle.data.class,
        'su-progress__background'
      ]

      circle.data.style = {
        ...circle.data.style,
        ...this.backgroundStyles,
        stroke: this.getCssColor(this.computedBackgroundColor)
      }

      return circle
    },
    genCircle(){
      const { computedSize, computedWidth, linecap, computedRotate, } = this

      const circle = this.$createElement('circle', {
        attrs: {
          cx: computedSize / 2,
          cy: computedSize / 2,
          r: this.calcRadius
        }
      })

      return this.$createElement('svg', {
        style: {
          transform: `rotate(${computedRotate}deg)`,
          stroke: this.getCssColor(this.computedColor),
          strokeWidth: computedWidth,
          strokeLinecap: !linecap && this.indeterminate ? 'round' : linecap
        },
        attrs: {
          width: computedSize,
          height: computedSize,
          viewBox: `0 0 ${computedSize} ${computedSize}`
        }
      }, [
        circle
      ])
    },
    genCircleDeterminate(){
      const circle = this.genCircle()

      circle.data.style = {
        ...circle.data.style,
        strokeDasharray: `${this.calcCircumference * (this.computedValue / 100)} ${this.calcCircumference}`
      }

      return circle
    },
    genCircleIndeterminate(){
      const { indeterminateBezier, computedIndeterminateDasharray, computedIndeterminateDuration, computedRotate } = this
      const dasharray = this.calcCircumference - computedIndeterminateDasharray

      this.insertKeyframesDashoffset('SuProgressCircleIndeterminate', dasharray, `-${dasharray}`)
      this.insertKeyframesTransform('SuProgressCircleIndeterminateRotate', `rotate(${computedRotate + 360}deg)`)

      const circle = this.genCircle()

      circle.data.style = {
        ...circle.data.style,
        strokeDasharray: `${dasharray} ${dasharray}`,
        animation: `SuProgressCircleIndeterminate ${computedIndeterminateDuration}s infinite ${indeterminateBezier},
                    SuProgressCircleIndeterminateRotate ${computedIndeterminateDuration / 2}s infinite linear`
      }

      return circle
    },
    genContent(){
      return [
        this.genBackground(),
        this.indeterminate ? this.genCircleIndeterminate() : this.genCircleDeterminate(),
        this.genDefaultSlot()
      ]
    },
    genDefaultSlot(){
      const { computedSize, computedWidth } = this

      const defaultSlot = SuProgress.options.methods.genDefaultSlot.call(this)

      const slotSize = computedSize - (computedWidth * 2)

      defaultSlot.data.style = {
        ...defaultSlot.data.style,
        width: `${slotSize}px`,
        height: `${slotSize}px`,
      }

      return defaultSlot
    },
    insertKeyframesDashoffset( name, from, to ){
      insertCssKeyframes(name, `{
        from {
          stroke-dashoffset: ${from};
        }
        to {
          stroke-dashoffset: ${to};
        }
      }`)
    },
    insertKeyframesTransform( name, to ){
      insertCssKeyframes(name, `{
        to {
          transform: ${to};
        }
      }`)
    }
  },
  render(h){
    const render = SuProgress.options.render.call(this, h)

    const { computedSize } = this

    render.data.style = {
      ...render.data.style,
      width: `${computedSize}px`,
      height: `${computedSize}px`,
    }

    return render
  }
})