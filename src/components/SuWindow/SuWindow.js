// components
import { SuItemGroupBase } from "../SuItemGroup/SuItemGroup"
import { SuIcon } from '../SuIcon'

// directives
import Touch from '../../directives/Touch'

// helpers
import { getSlot, strUpperFirst } from '../../util/helpers'

export default SuItemGroupBase.extend({
  name: 'su-window',
  props: {
    prevIcon: {
      type: String,
      default: undefined
    },
    nextIcon: {
      type: String,
      default: undefined
    },
    showArrows: {
      type: Boolean,
      default: false
    },
    continuing: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  provide(){
    return {
      windowGroup: this
    }
  },
  directives: {
    Touch
  },
  data: () => ({
    pageAction: ''
  }),
  computed: {
    computedPrevIcon(){
      return this.prevIcon ? this.prevIcon : this.vertical ? 'expand_less' : 'chevron_left'
    },
    computedNextIcon(){
      return this.nextIcon ? this.nextIcon : this.vertical ? 'expand_more' : 'chevron_right'
    },
    hasPrev(){
      return this.continuing || this.internalIndex > 0
    },
    hasNext(){
      return this.continuing || this.internalIndex < this.items.length - 1
    },
    internalIndex(){
      return this.items.findIndex(item => {
        return this.value === this.items.indexOf(item)
      })
    }
  },
  watch: {
    internalModelValue(val, old){
      if( this.items.length <= 2 ){
        this.pageAction = val > old ? 'next' : 'prev'
      } else {
        this.pageAction = val > old ?
          val === (this.items.length -1) && old === 0 ? 'prev' : 'next' :
          val === 0 && old === (this.items.length -1) ? 'next' : 'prev'
      }
    }
  },
  methods: {
    genIcon(direction){
      if( !direction ) return

      return this.$createElement(SuIcon, {}, this[`computed${strUpperFirst(direction)}Icon`])
    },
    genPrev(){
      if( !this.hasPrev ) return

      const slot = getSlot(this, 'prev')

      return this.$createElement('div', {
        staticClass: 'su-window__prev',
        on: {
          click: this.onPrev
        }
      }, [slot ? slot : this.genIcon('prev')])
    },
    genNext(){
      if( !this.hasNext ) return

      const slot = getSlot(this, 'next')

      return this.$createElement('div', {
        staticClass: 'su-window__next',
        on: {
          click: this.onNext
        }
      }, [slot ? slot : this.genIcon('next')])
    },
    genContent(){
      return this.$createElement('div', {
        class: [
          'su-window__content'
        ]
      }, this.$slots.default)
    },
    genAttachs(){
      if( !this.showArrows || !(this.internalValue !== null) ) return

      return this.$createElement('div', {
        class: [
          'su-window__attachs'
        ]
      }, [
        this.genPrev(),
        this.genNext()
      ])
    },
    onNext(){
      if( !this.hasNext ) return

      const index = this.internalValue + 1

      this.internalValue = index > (this.items.length - 1) ? 0 : index
    },
    onPrev(){
      if( !this.hasPrev ) return

      const index = this.internalValue - 1

      this.internalValue = index < 0 ? this.items.length - 1 : index
    },
  },
  render(h){
    return h(this.tag, {
      class: [
        'su-window',
        {
          'su-window--is-vertical': this.vertical
        }
      ],
      directives: [
        {
          name: 'touch',
          value: {
            left: this.onNext,
            right: this.onPrev,
            start: (e) => {
              e.stopPropagation()
            },
            end: (e) => {
              e.stopPropagation()
            }
          }
        }
      ],
    }, [
      this.genContent(),
      this.genAttachs()
    ])
  }
})