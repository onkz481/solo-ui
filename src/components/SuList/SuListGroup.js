// styles
import './SuListGroup.scss'

// mixins
import colorable from '../../mixins/colorable'
import toggleable from '../../mixins/toggleable'
import { inject as RegistableInject } from '../../mixins/registrable'

// components
import { SuIcon } from '../SuIcon'
import SuListItem from './SuListItem'
import SuListItemIcon from './SuListItemIcon'
import { SuMenu } from '../SuMenu'
import SuExpandTransition from '../SuTransition/SuExpandTransition'

// helpers
import { getSlot } from '../../util/helpers'

import Vue from 'vue'

const listProvideName = 'list'

export default Vue.extend({
  name: 'SuListGroup',
  provide(){
    return {
      isInGroup: true,
    }
  },
  components: {
    SuExpandTransition
  },
  mixins:[colorable, toggleable, RegistableInject(listProvideName)],
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    text: {
      type: Boolean,
      default: true
    },
    prependIcon: {
      type: String,
      default: undefined
    },
    appendIcon: {
      type: String,
      default: 'mdi-chevron-down'
    },
    rounded: {
      type: String,
      default: undefined
    },
    group: {
      type: [String, RegExp],
      default: undefined
    }
  },
  inject: {
    isInNav: {
      default: false
    }
  },
  data: () => ({
    isActive: false,
    menuNode: null
  }),
  computed: {
    isNarrow(){
      return this.isInNav && this.$soloui.layout.narrow
    },
    isPrependIcon(){
      return this.prependIcon !== undefined;
    },
    classes(){
      return [
        this.isActive && this.colorableClasses,
        {
          'su-list-group--active': this.isActive
        }
      ];
    }
  },
  watch: {
    isActive(val){
      if( val ) this.list && this.list.listClick(this._uid)
    },
    'menuNode.componentInstance.isActive'(val){
      this.isActive = val
    },
    $route: 'routeChange',
  },
  created(){
    this[listProvideName] && this[listProvideName].register(this)

    if( this.$route && this.toggleValue == null ) this.isActive = this.routeMatch(this.$route.path)
  },
  beforeDestroy(){
    this[listProvideName] && this[listProvideName].unregister(this)
  },
  methods: {
    genIcon(icon){
      if( !icon ) return

      return this.$createElement(SuIcon, {}, icon)
    },
    genPrependIcon(){
      if( !this.prependIcon ) return

      return this.$createElement(SuListItemIcon, {
        staticClass: 'su-list-group__prepend-icon'
      }, [this.genIcon(this.prependIcon)])
    },
    genAppendIcon(){
      if( !this.appendIcon ) return

      return this.$createElement(SuListItemIcon, {
        staticClass: 'su-list-group__append-icon'
      }, [this.genIcon(this.appendIcon)])
    },
    genHeader(){
      const activator = getSlot(this, 'activator')

      return this.$createElement(SuListItem, {
        staticClass: 'su-list-group__header',
        props: {
          toggleValue: this.isActive,
          link: true
        },
        on: {
          click: this.onClick
        }
      }, [
        this.genPrependIcon(),
        activator,
        this.genAppendIcon()
      ])
    },
    genMenu(){
      const icon = this.prependIcon && this.$createElement(SuListItemIcon, {}, [this.genIcon(this.prependIcon)])

      const node = this.$createElement(SuMenu, {
        props: {
          offsetX: true,
          right: true
        },
        scopedSlots: {
          default: ({ top }) => {
            return this.$createElement('su-card', {
              class: [
                'overflow-y-auto'
              ],
              style: {
                maxHeight: `calc(100vh - ${top + this.$soloui.layout.gutter}px)`
              }
            }, this.$slots.default)
          },
          activator: ({ on }) => {
            return this.$createElement(SuListItem, {
              staticClass: 'su-list-group__header',
              props: {
                toggleValue: this.isActive,
                link: true
              },
              on: on
            }, [icon])
          }
        }
      })

      this.menuNode = node

      return node
    },
    genTransition(item){
      return this.$createElement(SuExpandTransition, {}, [item])
    },
    genItems(){
      return this.$createElement('div', {
        staticClass: 'su-list-group__items',
        directives: [
          {
            name: 'show',
            value: this.isActive
          }
        ]
      }, this.$slots.default)
    },
    onClick(e){
      this.$emit('click', e)
      
      this.$nextTick(() => {
        this.isActive = !this.isActive
      })
    },
    toggle(uid){
      const isActive = this._uid === uid

      this.$nextTick(() => {
        this.isActive = isActive
      })
    },
    routeChange(to){
      if( !this.group ) return

      const isActive = this.routeMatch(to.path)

      if( isActive && this.isActive !== isActive )
        this[listProvideName] && this[listProvideName].listClick(this._uid)
      
      this.isActive = isActive
    },
    routeMatch(to){
      return to.match(this.group) !== null
    },
  },
  render(h){
    return h('div', {
      staticClass: 'su-list-group',
      class: this.classes
    },
    this.isNarrow ? [
      this.genMenu()
    ] : [
      this.genHeader(),
      this.genTransition(this.genItems())
    ])
  }
})