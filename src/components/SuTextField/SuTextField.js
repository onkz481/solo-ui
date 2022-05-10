import { vueUidMixin } from 'vue-uid'

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
      default: 'clear'
    },
    rounded: {
      type: String,
      default: 'normal'
    }
  },
  data: () => ({
    labelOffsetWidth: 0,
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
    legendWidth(){
      return {
        width: this.labelOffsetWidth + 'px'
      }
    },
    isMessages(){
      return this.isAutoDetails ? (this.hasMessages || this.isFocus) : !this.hideDetails
    }
  },
  updated(){
    this.labelOffsetWidth = this.hasLabel && ( this.isFocus || this.isValue ) ? (this.$refs.label.$el.offsetWidth * 0.75) + 10 : 0;
  },
  methods: {
    genDefaultSlot(){
      return [
        this.genSlot('prepend', 'inner'),
        this.genFieldset(),
        this.genTextFieldSlot(),
        this.clearable ? this.genSlot('append', 'inner', this.clearIcon, {
          on: {
            click: this.clear
          }
        }) : this.genSlot('append', 'inner')
      ]
    },
    genFieldset(){
      const legend = this.$createElement('legend', {
        style: this.legendWidth,
        ref: 'legend'
      })

      return this.$createElement('fieldset', {
        attrs: {
          'aria-hidden': 'true'
        }
      }, [legend])
    },
    genTextFieldSlot(){
      return this.$createElement('div', {
        staticClass: 'su-text-field__slot'
      }, [
        this.genLabel(),
        this.genForm('input', { type: 'text' }),
        this.genDetails()
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
    clear(){
      this.internalValue = ''
    }
  }
})