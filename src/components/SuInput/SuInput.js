// styles
import './SuInput.scss'

// mixins
import themeable from '../../mixins/themeable'
import colorable from '../../mixins/colorable'
import validatable from '../../mixins/validatable'

//components
import { SuIcon } from '../SuIcon'
import { SuTransition } from '../SuTransition'
import { SuLabel } from '../SuLabel'

//helpers
import { isNumber, toKebabCase } from '../../util/helpers'

import Vue from 'vue'

export default Vue.extend({
  name: 'SuInput',
  mixins: [themeable, validatable, colorable],
  props: {
    appendIcon: {
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
    prependIcon: {
      type: String,
      default: undefined
    },
  },
  data: () => ({
    isFocus: false
  }),
  computed: {
    classes(){
      return [
        this.themeableClass,
        {
          'su-input--has-label': this.hasLabel,
          'su-input--is-focus': this.isFocus,
          'su-input--is-active': this.isActive,
          'su-input--is-error': this.hasError,
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
    isActive(){
      return this.isValue || this.isFocus
    },
    isValue(){
      return !!this.internalValue || isNumber(this.internalValue)
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
        this.genSlot('prepend'),
        this.genInputSlotWrapper(),
        this.genSlot('append'),
      ]
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
          color: this.computedColor
        }
      }, iconName)
    },
    genSlot(type, iconName, attrs = {}){
      const slotName = type

      if( !this.$slots[slotName] && !this[`${slotName}Icon`] && !iconName ) return

      let slot = this.$slots[slotName] ?
        this.$slots[slotName] :
        (this[`${slotName}Icon`] || iconName) ? this.genIcon(iconName ? iconName : this[`${slotName}Icon`]) : []

      return this.$createElement('div', Object.assign({
        staticClass: `su-input__${toKebabCase(type)}`,
        on: {
          click: (e) => {
            this.$emit(`click:${toKebabCase(type)}`, e)
          }
        },
        ref: type
      }, attrs), [slot])
    },
    genInputSlot(){
      return this.$createElement('div', {
        staticClass: 'su-input__slot',
        on: {
          click: this.onClick,
          mousedown: this.onMousedown,
          mouseup: this.onMouseup
        },
        ref: 'inputSlot'
      }, [
        this.genDefaultSlot()
      ])
    },
    genInputSlotWrapper(){
      return this.$createElement('div', {
        staticClass: 'su-input__slot-wrapper'
      }, [
        this.genInputSlot(),
        this.genDetails()
      ])
    },
    genDefaultSlot(){
      return [
        this.$slots.default
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
    let data = {
      staticClass: 'su-input',
      class: this.classes
    }

    if( this.isFocus && !this.hasError ) data = this.setTextColor(data)

    return h('div', data, this.genContent())
  }
})