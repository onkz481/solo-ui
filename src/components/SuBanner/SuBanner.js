// styles
import './SuBanner.scss'

// mixins
import { generator as ModelableGenerator } from '../../mixins/modelable'

// components
import SuSheet from '../SuSheet'
import SuExpandTransition from '../SuTransition/SuExpandTransition'

// helpers
import { getSlot } from '../../util/helpers'

export default SuSheet.extend({
  name: 'SuBanner',
  components: {
    SuExpandTransition
  },
  mixins: [
    ModelableGenerator('value', 'input', { defaultValue: true })
  ],
  props: {
    singleLine: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes(){
      return [
        'su-banner',
        {
          'su-banner--is-mobile': this.$soloui.layout.mobile,
          'su-banner--single-line': this.singleLine
        },
        ...SuSheet.options.computed.classes.call(this)
      ]
    },
    styles(){
      return [
        ...SuSheet.options.computed.styles.call(this)
      ]
    }
  },
  methods: {
    genTransition(node){
      return this.$createElement(SuExpandTransition, {}, [node])
    },
    genWrapper(){
      return this.$createElement('div', {
        staticClass: 'su-banner__wrapper'
      }, [
        this.genContent(),
        this.genActions()
      ])
    },
    genContent(){
      const slot = getSlot(this, 'icon')

      return this.$createElement('div', {
        staticClass: 'su-banner__content'
      }, [
        slot,
        this.genText()
      ])
    },
    genText(){
      return this.$createElement('div', {
        staticClass: 'su-banner__text'
      }, this.$slots.default)
    },
    genActions(){
      const slot = getSlot(this, 'actions', {
        close: this.onClose
      })

      return this.$createElement('div', {
        class: 'su-banner__actions'
      }, [slot])
    },
    onClose(){
      this.internalValue = false
    }
  },
  render(h){
    const render = this.internalValue ? h(this.tag, this[this.text ? 'setTextColor' : 'setBackgroundColor']({
      class: this.classes,
      style: this.styles,
    }), [
      this.genWrapper()
    ]) : undefined

    return this.genTransition(render)
  }
})