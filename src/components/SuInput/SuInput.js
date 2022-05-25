// mixins
import themeable from '../../mixins/themeable'
import colorable from '../../mixins/colorable'
import validatable from '../../mixins/validatable'

//components
import { SuIcon } from '../SuIcon'
import { SuTransition } from '../SuTransition'
import { SuLabel } from '../SuLabel'

//helpers
import { strUpperFirst } from '../../util/helpers'

import Vue from 'vue'

export default Vue.extend({
  name: 'SuInput',
  mixins: [themeable, validatable, colorable],
  props: {
    appendInnerIcon: {
      type: String,
      default: undefined
    },
    appendOuterIcon: {
      type: String,
      default: undefined
    },
    color: {
      type: String,
      default: 'primary'
    },
    hideDetails: {
      type: [Boolean, String],
      default: 'auto'
    },
    hint: {
      type: String,
      default: undefined
    },
    id: {
      type: String,
      default: undefined
    },
    label: {
      type: String,
      default: undefined
    },
    prependInnerIcon: {
      type: String,
      default: undefined
    },
    prependOuterIcon: {
      type: String,
      default: undefined
    },
    text: {
      type: Boolean,
      default: true
    },
  },
  data: () => ({
    isFocus: false,
  }),
  computed: {
    classes(){
      return [
        (this.isFocus && !this.hasError) ? this.colorableClasses : undefined,
        this.themeableClass,
        {
          'su-input--has-label': this.hasLabel,
          'su-input--is-focus': this.isFocus,
          'su-input--is-active': this.isValue || this.isFocus,
          'su-input--is-error': this.hasError,
          'su-input--is-prepend-inner': this.$slots.prependInner || this.prependInnerIcon,
          'su-input--is-prepend-inner-event': typeof this.$listeners['click:prepend-inner'] === 'function',
          'su-input--is-prepend-outer': this.$slots.prependOuter || this.prependOuterIcon,
          'su-input--is-prepend-outer-event': typeof this.$listeners['click:prepend-outer'] === 'function',
          'su-input--is-append-inner': this.$slots.appendInner || this.appendInnerIcon,
          'su-input--is-append-inner-event': typeof this.$listeners['click:append-inner'] === 'function',
          'su-input--is-append-outer': this.$slots.appendOuter || this.appendOuterIcon,
          'su-input--is-append-outer-event': typeof this.$listeners['click:append-outer'] === 'function',
          'su-input--hide-details': !this.isDetails,
          ...this.errorClasses
        }
      ]
    },
    computedColor(){
      const color = validatable.options.computed.computedColor.call(this)

      return this.isFocus && !color ? this.color : color
    },
    computedId(){
      return this.id || `input-${this._uid}`
    },
    computedMessages(){
      return this.hasHint ? [this.hint] : this.validationInternalMessages
    },
    errorClasses(){
      return {
        'error--text': this.hasError
      }
    },
    hasHint(){
      return !this.hasMessages && !!this.hint
    },
    hasLabel(){
      return this.$slots.label || this.label
    },
    isValue(){
      return this.internalValue && ( this.internalValue.length > 0 )
    },
    isAutoDetails(){
      return ( typeof this.hideDetails === 'string' && this.hideDetails === 'auto' )
    },
    isDetails(){
      return typeof this.hideDetails === 'boolean' ? !this.hideDetails : this.isAutoDetails
    },
    isMessages(){
      return this.isAutoDetails ? (this.hasMessages || this.hasHint || this.isFocus) : !this.hideDetails
    }
  },
  methods: {
    genContent(){
      return [
        this.genContainer()
      ]
    },
    genContainer(){
      return this.$createElement('div', {
        staticClass: 'su-input__container'
      }, [
        this.genInputSlotOuter()
      ])
    },
    genLabel(){
      if( !this.hasLabel ) return

      return this.$createElement(SuLabel, {
        props: {
          color: this.computedColor
        },
        attrs: {
          for: this.computedId
        },
        ref: 'label'
      }, this.$slots.label || this.label)
    },
    genIcon(iconName){
      return this.$createElement(SuIcon, {
        props: {
          color: this.computedColor,
          text: true
        }
      }, iconName)
    },
    genSlot(type, position, iconName, attrs = {}){
      const slotName = `${type}${strUpperFirst(position)}`

      if( !this.$slots[slotName] && !this[`${slotName}Icon`] && !iconName ) return

      let slot = this.$slots[slotName] ?
        this.$slots[slotName] :
        (this[`${slotName}Icon`] || iconName) ? this.genIcon(iconName ? iconName : this[`${slotName}Icon`]) : []

      return this.$createElement('div', Object.assign({
        staticClass: `su-input__${type}-${position}`,
        on: {
          click: (e) => {
            this.$emit(`click:${type}-${position}`, e)
          }
        }
      }, attrs), [slot])
    },
    genInputSlot(){
      return this.$createElement('div', {
        staticClass: 'su-input__slot'
      }, [
        this.genLabel(),
        this.$slots.default,
        this.genDetails()
      ])
    },
    genInputSlotInner(){
      return this.$createElement('div', {
        staticClass: 'su-input__slot-inner',
        on: {
          click: this.onClick,
          mousedown: this.onMousedown,
          mouseup: this.onMouseup
        }
      }, [
        this.genDefaultSlot()
      ])
    },
    genInputSlotOuter(){
      return this.$createElement('div', {
        staticClass: 'su-input__slot-outer'
      }, [
        this.genSlot('prepend', 'outer'),
        this.genInputSlotInner(),
        this.genSlot('append', 'outer'),
      ])
    },
    genDefaultSlot(){
      return [
        this.genSlot('prepend', 'inner'),
        this.genInputSlot(),
        this.genSlot('append', 'inner')
      ]
    },
    genDetails(){
      if( !this.isDetails ) return

      const transition = this.$createElement(SuTransition, {
        props: {
          transition: 'slide-y'
        }
      }, [this.genMessages()])

      return this.$createElement('div', {
        staticClass: 'su-input__details'
      }, [transition])
    },
    genMessages(){
      const messages = this.computedMessages.map((message, i) => {
        return this.$createElement('div', {
          staticClass: 'su-input__message',
          attrs: {
            title: message
          },
          domProps: {
            innerText: message
          },
          key: i
        })
      })

      return this.$createElement('div', {
        staticClass: 'su-input__messages',
        class: [
          this.errorClasses
        ],
        directives: [
          {
            name: 'show',
            value: this.isMessages
          }
        ]
      }, [messages])
    },
    onClick(e){
      this.$emit('click', e)
    },
    onMousedown(e){
      this.$emit('mousedown', e)
    },
    onMouseup(e){
      this.$emit('mouseup', e)
    }
  },
  render(h){
    return h('div', {
      staticClass: 'su-input',
      class: this.classes
    }, this.genContent())
  }
})