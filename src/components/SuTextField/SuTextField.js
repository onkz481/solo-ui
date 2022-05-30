import { vueUidMixin } from 'vue-uid'

// styles
import './SuTextField.scss'

// mixins
import roundable from '../../mixins/roundable'

// components
import { SuInput } from '../SuInput'

export default SuInput.extend({
  name: 'SuTextField',
  mixins: [vueUidMixin, roundable],
  props: {
    clearable: {
      type: Boolean,
      default: false
    },
    clearIcon: {
      type: String,
      default: 'mdi-close'
    },
    rounded: {
      type: String,
      default: 'normal'
    }
  },
  data: () => ({
    legendStyles: {
      width: 0
    },
    labelStyles: {
      left: 0
    }
  }),
  computed: {
    classes(){
      return [
        ...SuInput.options.computed.classes.call(this),
        'su-text-field',
        this.roundableClasses,
        this.clearableClasses
      ]
    },
    clearableClasses(){
      return {
        'su-input--is-append-inner': this.$slots.appendInner || this.appendInnerIcon || this.clearable,
        'su-input--is-append-inner-event': typeof this.$listeners['click:append-inner'] === 'function' || this.clearable,
      }
    },
    formStyles(){
      return {}
    },
    isMessages(){
      return this.isAutoDetails ? (this.hasMessages || this.isFocus) : !this.hideDetails
    }
  },
  updated(){
    this.setLegendStyles()
    this.setLabelStyles()
  },
  methods: {
    clear(){
      this.internalValue = ''
    },
    genDefaultSlot(){
      return [
        this.genSlot('prependInner'),
        this.genFieldset(),
        this.genTextFieldSlot(),
        this.clearable ? this.genSlot('appendInner', this.clearIcon, {
          on: {
            click: this.clear
          }
        }) : this.genSlot('appendInner')
      ]
    },
    genFieldset(){
      const legend = this.$createElement('legend', {
        style: {
          width: `${this.legendStyles.width}px`
        },
        ref: 'legend'
      })

      return this.$createElement('fieldset', {
        attrs: {
          'aria-hidden': 'true'
        },
        ref: 'fieldset'
      }, [
        legend
      ])
    },
    genLabel(){
      const label = SuInput.options.methods.genLabel.call(this)

      if( !label ) return

      label.data.style = {
        left: `${this.labelStyles.left}px`
      }

      return label
    },
    genTextFieldSlot(){
      return this.$createElement('div', {
        staticClass: 'su-text-field__slot'
      }, [
        this.genLabel(),
        this.genForm('input', { type: 'text' })
      ])
    },
    genForm(form = 'input', attr){
      let attrs = {
        id: this.computedId
      }

      if( attr ) attrs = Object.assign(attrs, attr)

      return this.$createElement(form, {
        attrs: attrs,
        style: this.formStyles,
        domProps: {
          value: this.internalValue
        },
        on: {
          input: this.onInput,
          focus: this.onFocus,
          blur: this.onBlur,
          mousedown: (e) => {e.stopPropagation()}
        },
        ref: form
      })
    },
    onInput(event){
      this.internalValue = event.target.value

      this.validate()
    },
    onFocus(){
      this.isFocus = true
    },
    onBlur(){
      this.validate()

      this.isFocus = false
    },
    onMousedown(e){
      this.$refs.input.focus()

      e.preventDefault()
    },
    setLabelStyles(){
      if( !this.hasLabel ) return

      let left = 0

      const legendWidth = (this.$refs.label.$el.offsetWidth * 0.75) + 10
      const labelWidth = this.$refs.label.$el.offsetWidth * 0.75
      const offsetLeft = (legendWidth - labelWidth) / 2

      if( !this.isActive ){
        left = 0

      } else if( !this.$refs.prependInner ){
        left = offsetLeft
      } else {
        const { width, marginRight } = window.getComputedStyle(this.$refs.prependInner)

        left = -((parseInt(width) + parseInt(marginRight)) - offsetLeft)
      }

      this.labelStyles.left = left
    },
    setLegendStyles(){
      if( !this.hasLabel ) return

      if( !this.isActive ){
        this.legendStyles.width = 0

        return
      }

      this.legendStyles.width = (this.$refs.label.$el.offsetWidth * 0.75) + 10
    }
  }
})