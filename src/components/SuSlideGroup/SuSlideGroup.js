// styles
import './SuSlideGroup.scss'

// components
import { SuIcon } from '../SuIcon'

// mixins
import { SuItemGroupBase } from '../SuItemGroup/SuItemGroup'

// directives
import Resize from '../../directives/Resize'
import Touch from '../../directives/Touch'

// helpers
import { getSlot, strUpperFirst } from '../../util/helpers'

export const SuSlideGroupBase = SuItemGroupBase.extend({
  directives: {
    Resize,
    Touch
  },
  props: {
    activeClass: {
      type: String,
      default: 'su-slide-item--active'
    },
    prevIcon: {
      type: String,
      default: 'mdi-chevron-left'
    },
    nextIcon: {
      type: String,
      default: 'mdi-chevron-right'
    },
    showArrows: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    isOverflow: false,
    scrollOffset: 0,
    translateXOffset: 0,
    startX: 0,
    isSwipingHorizontal: false,
    isSwiping: false,
    widths: {
      content: 0,
      wrapper: 0,
    }
  }),
  computed: {
    classes(){
      return [
        ...SuItemGroupBase.options.computed.classes.call(this),
        'su-slide-group'
      ]
    },
    hasAttachs(){
      return this.isOverflow || Math.abs(this.scrollOffset) > 0
    },
    hasAttachNext(){
      if( !this.hasAttachs ) return false

      const { content, wrapper } = this.widths

      return content > Math.abs(this.scrollOffset) + wrapper
    },
    hasAttachPrev(){
      return this.hasAttachs && this.scrollOffset !== 0
    }
  },
  watch: {
    internalModelValue: 'setWidths',
    scrollOffset(){
      const { scrollOffset, widths } = this

      let scroll = ( scrollOffset > widths.content - widths.wrapper )
        ? -(widths.content - widths.wrapper) + (widths.content - widths.wrapper - scrollOffset)
        : -scrollOffset

      this.translateXOffset = scroll
    }
  },
  mounted(){
    this.setWidths()
  },
  methods: {
    genIcon(direction){
      if( !direction ) return

      const hasAttach = this[`hasAttach${strUpperFirst(direction)}`]

      return this.$createElement(SuIcon, {
        props: {
          disabled: !hasAttach
        }
      }, this[`${direction}Icon`])
    },
    genPrev(){
      if( !this.showArrows ) return

      const slot = getSlot(this, 'prev')

      return this.$createElement('div', {
        staticClass: 'su-slide-group__prev',
        class: {
          'su-slide-group__prev--disabled': !this.hasAttachPrev
        },
        on: {
          click: () => this.onAttachsClick('prev')
        }
      }, [slot ? slot : this.genIcon('prev')])
    },
    genNext(){
      if( !this.showArrows ) return
      
      const slot = getSlot(this, 'next')

      return this.$createElement('div', {
        staticClass: 'su-slide-group__next',
        class: {
          'su-slide-group__next--disabled': !this.hasAttachNext
        },
        on: {
          click: () => this.onAttachsClick('next')
        }
      }, [slot ? slot : this.genIcon('next')])
    },
    genWrapper(){
      return this.$createElement('div', {
        staticClass: 'su-slide-group__wrapper',
        directives: [
          {
            name: 'touch',
            value: {
              start: (e) => this.onTouch(e, this.onTouchStart),
              end: (e) => this.onTouch(e, this.onTouchEnd),
              move: (e) => this.onTouch(e, this.onTouchMove)
            }
          }
        ],
        ref: 'wrapper',
      }, [this.genContent()])
    },
    genContent(item){
      return this.$createElement('div', {
        staticClass: 'su-slide-group__content',
        style: {
          transform: `translateX(${this.translateXOffset}px)`
        },
        ref: 'content',
      }, item ? [
        item,
        ...this.$slots.default
      ] : this.$slots.default)
    },
    calculateNewOffset(direction){
      if( !['prev', 'next'].includes(direction) ) return

      const { scrollOffset } = this
      const { content, wrapper } = this.$refs
      const widths = {
        content: content ? content.clientWidth : 0,
        wrapper: wrapper ? wrapper.clientWidth : 0,
      }
      const newAbsoluteOffset = 1 * scrollOffset + ( direction === 'prev' ? -1 : 1 ) * widths.wrapper

      return 1 * Math.max( Math.min(newAbsoluteOffset, widths.content - widths.wrapper), 0 )
    },
    calculateUpdateOffset(){
      const { selectedItem, widths, scrollOffset } = this
      const { clientWidth, offsetLeft } = selectedItem.$el

      const totalWidth = widths.wrapper + scrollOffset
      const itemOffset = clientWidth + offsetLeft
      const additionalOffset = clientWidth * 0.4

      if( offsetLeft <= scrollOffset ){
        this.scrollOffset = Math.max(offsetLeft - additionalOffset, 0)
      } else if (totalWidth <= itemOffset) {
        this.scrollOffset = Math.min(scrollOffset - (totalWidth - itemOffset -additionalOffset), widths.content - widths.wrapper)
      }
    },
    scrollTo(direction){
      if( !['prev', 'next'].includes(direction) ) return

      this.scrollOffset = this.calculateNewOffset(direction)
    },
    scrollView(){
      if( !this.selectedItem && this.items.length ){
        const lastItemPosition = this.items[this.items.length - 1].$el.getBoundingClientRect()
        const wrapperPosition = this.$refs.wrapper.getBoundingClientRect()
        
        if( wrapperPosition.left > lastItemPosition.left )
          this.scrollTo('prev')
      }

      if( !this.selectedItem ) return

      if( !this.isOverflow ){
        this.scrollOffset = 0
      } else if( this.isOverflow ) {
        this.calculateUpdateOffset()
      }
    },
    setWidths(){
      window.requestAnimationFrame(() => {
        if( this._isDestroyed ) return

        const { content, wrapper } = this.$refs

        this.widths = {
          content: content ? content.clientWidth : 0,
          wrapper: wrapper ? wrapper.clientWidth : 0,
        }

        this.isOverflow = this.widths.wrapper + 1 < this.widths.content

        this.scrollView()
      })
    },
    onAttachsClick(direction){
      if( !['prev', 'next'].includes(direction) ) return

      this.$emit(`click:${direction}`)
      this.scrollTo(direction)
    },
    onResize(){
      if( this._isDestroyed ) return

      this.setWidths()
    },
    onTouch(e, fn){
      e.stopPropagation()

      fn(e)
    },
    onTouchStart(e){
      const { content } = this.$refs

      this.startX = this.scrollOffset + e.touchstartX

      content.style.setProperty('transition', 'none')
      content.style.setProperty('willChange', 'transform')
    },
    onTouchMove(e){
      if( !this.isSwiping ){
        const diffX = e.touchmoveX - e.touchstartX
        const diffY = e.touchmoveY - e.touchstartY

        this.isSwipingHorizontal = Math.abs(diffX) > Math.abs(diffY)
        this.isSwiping = true
      }

      if (this.isSwipingHorizontal) {
        this.scrollOffset = this.startX - e.touchmoveX
        document.documentElement.style.overflowY = 'hidden'
      }
    },
    onTouchEnd(){
      const { content, wrapper } = this.$refs
      const maxScrollOffset = content.clientWidth - wrapper.clientWidth

      content.style.setProperty('transition', null)
      content.style.setProperty('willChange', null)

      if (this.scrollOffset < 0 || !this.isOverflow) {
        this.scrollOffset = 0
      } else if (this.scrollOffset >= maxScrollOffset) {
        this.scrollOffset = maxScrollOffset
      }

      this.isSwiping = false
      document.documentElement.style.removeProperty('overflow-y')
    }
  },
  render(h){
    return h(this.tag, {
      class: this.classes,
      directives: [
        {
          name: 'resize',
          value: this.onResize,
        }
      ]
    }, [
      this.genPrev(),
      this.genWrapper(),
      this.genNext()
    ])
  }
})

export default SuSlideGroupBase.extend({
  name: 'SuSlideGroup',
  provide(){
    return {
      slideGroup: this
    }
  }
})