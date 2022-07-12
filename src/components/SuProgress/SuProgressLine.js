// styles
import './SuProgressLine.scss'

// components
import SuProgress from "./SuProgress"

// mixins
import roundable from '../../mixins/roundable'

const typeBoolean = {
  type: Boolean,
  default: false
}

export default SuProgress.extend({
  name: 'SuProgressLine',
  mixins: [
    roundable
  ],
  props: {
    absolute: typeBoolean,
    active: {
      type: Boolean,
      default: true
    },
    bottom: typeBoolean,
    color: {
      type: String,
      default: 'primary'
    },
    height: {
      type: [Number, String],
      default: 4
    },
    reverse: typeBoolean,
    top: typeBoolean,
  },
  computed: {
    classes(){
      return [
        ...SuProgress.options.computed.classes.call(this),
        'su-progress-line',
        this.absolute && 'su-progress-line--absolute',
        this.roundableClasses
      ]
    },
    computedHeight(){
      const height = Number(this.height)

      return this.active && !isNaN(height) && height > 0 ? height : 0
    },
    styles(){
      return [
        {
          top: this.top ? 0 : undefined,
          bottom: this.bottom ? 0 : undefined,
          height: `${this.computedHeight}px`
        }
      ]
    }
  },
  methods: {
    genContent(){
      return [
        this.genBackground(),
        this.indeterminate ? this.genLineIndeterminate() : this.genLineDeterminate(),
        this.genDefaultSlot()
      ]
    },
    genLineIndeterminate(){
      if( !this.active ) return

      const className = 'su-progress-line__indeterminate'

      return this.$createElement('div', {
        staticClass: className,
        class: [
          'wrapper'
        ]
      }, [
        this.genLineIndeterminateBar(className),
        this.genLineIndeterminateBar(className, 'short')
      ])
    },
    genLineIndeterminateBar( className, name = 'long' ){
      return this.$createElement('div', this.setBackgroundColor({
        staticClass: className,
        class: [
          name,
          this.reverse && 'reverse'
        ],
      }, this.computedColor))
    },
    genLineDeterminate(){
      return this.$createElement('div', this.setBackgroundColor({
        staticClass: 'su-progress-line__determinate',
        style: {
          width: `${this.computedValue}%`
        }
      }, this.computedColor))
    },
  },
  render(h){
    const render = SuProgress.options.render.call(this, h)

    return render
  }
})