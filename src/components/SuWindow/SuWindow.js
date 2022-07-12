// styles
import './SuWindow.scss'

// components
import { SuItemGroupBase } from "../SuItemGroup/SuItemGroup"
import { SuIcon } from '../SuIcon'
import { SuBtn } from '../SuBtn'

// directives
import Touch from '../../directives/Touch'

// helpers
import { getSlot, strUpperFirst } from '../../util/helpers'

export default SuItemGroupBase.extend({
  name: 'SuWindow',
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
    pageAction: '',
    heights: {
      prev: 0,
      next: 0
    }
  }),
  computed: {
    computedPrevIcon(){
      return this.prevIcon ? this.prevIcon : this.vertical ? 'mdi-chevron-up' : 'mdi-chevron-left'
    },
    computedNextIcon(){
      return this.nextIcon ? this.nextIcon : this.vertical ? 'mdi-chevron-down' : 'mdi-chevron-right'
    },
    hasPrev(){
      return this.continuing || this.internalIndex > 0
    },
    hasNext(){
      return this.continuing || this.internalIndex < this.items.length - 1
    },
    internalIndex(){
      return this.items.findIndex(item => {
        return this.internalValue === this.items.indexOf(item)
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
  updated(){
    this.$nextTick(() => {
      this.setAttachHeight( 'prev' )
      this.setAttachHeight( 'next' )
    })
  },
  mounted(){
    this.$nextTick(() => {
      this.setAttachHeight( 'prev' )
      this.setAttachHeight( 'next' )
    })
  },
  methods: {
    genAttach( ref ){
      if( !ref || !this[`has${strUpperFirst(ref)}`] ) return

      const on = {
        click: this[`on${strUpperFirst(ref)}`]
      }

      const attrs = {}

      const slot = getSlot(this, ref, { on, attrs })

      return this.$createElement('div', {
        staticClass: `su-window__${ref}`,
        style: {
          top: `calc(50% - ${this.heights[ref] / 2}px)`
        },
        ref
      }, [slot ? slot : this.genBtn(ref, { on, attrs })])
    },
    genBtn(direction, objects = {}){
      if( !direction ) return

      return this.$createElement(SuBtn, {
        props: {
          icon: true,
          text: true
        },
        ...objects
      }, [
        this.$createElement(SuIcon, {}, this[`computed${strUpperFirst(direction)}Icon`])
      ])
    },
    genContent(){
      return this.$createElement('div', {
        class: [
          'su-window__content'
        ]
      }, this.$slots.default)
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
    setAttachHeight( ref ){
      if( !ref || !this.$refs[ref] ) return

      this.heights[ref] = this.$refs[ref].clientHeight
    }
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
      this.genAttach('prev'),
      this.genAttach('next')
    ])
  }
})