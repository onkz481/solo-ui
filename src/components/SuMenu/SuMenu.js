// styles
import './SuMenu.scss'

// mixins
import roundable from '../../mixins/roundable'
import elevatable from '../../mixins/elevatable'
import menuable from '../../mixins/menuable'
import transitionable from '../../mixins/transitionable'

// directives
import ClickOutside from '../../directives/ClickOutside'

// helpers
import { insertBefore, insertBeforeAppAbsoluted } from '../../util/helpers'

import Vue from 'vue'

export default Vue.extend({
  name: 'SuMenu',
  directives: {
    ClickOutside
  },
  mixins: [roundable, elevatable, menuable, transitionable],
  inject: {
    isInNav: {
      default: false
    }
  },
  props: {
    closeOnContentClick: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    isActive: false,
  }),
  computed: {
    classes(){
      return [
        'su-menu',
        {
          'su-menu--is-active': this.isActive
        }
      ];
    }
  },
  mounted(){
    this.initialize()
  },
  methods: {
    initialize(){
      window.addEventListener('resize', this.updateDimensions)
      window.addEventListener('scroll', this.updateDimensions)

      this.$nextTick(() => {
        this.updateDimensions()

        insertBefore(this.$el.parentNode, this.activatorNode[0]['elm'], this.$el)
        
        if( this.isInNav ){
          insertBefore(document.getElementsByClassName('su-nav__fixed')[0], this.menuContentNode['elm'])
        } else {
          insertBeforeAppAbsoluted(this.menuContentNode['elm'])
        }
      })
    },
    genActivatorEventListeners(){
      const click = () => {
        this.isActive = !this.isActive

        this.$nextTick(() => {
          this.updateDimensions()
        })
      }

      return {
        'click': click
      }
    },
    genContent(){
      const contentOptions = {
        staticClass: 'su-menu-content',
        style: [
          {
            top: this.calcContentTop,
            left: this.calcContentLeft,
            width: this.getAppAbsolutedInnerWidth(this.dimensions.content.width),
          }
        ]
      }

      return this.$createElement('div', contentOptions, [
        this.genTransition( this.isActive ? this.genConetntInner() : undefined)
      ])
    },
    genConetntInner(){
      const innerContentOptions = {
        staticClass: 'su-menu-content__inner',
        attrs: {
          role: 'menu'
        },
        class: [
          this.elevatableClasses
        ],
        on: {
          click: this.onClick
        },
        directives: [
          {
            name: 'click-outside',
            value: this.onClickOutside
          }
        ]
      }

      return this.$createElement('div', innerContentOptions, this.$scopedSlots.default({
        top: parseInt(this.calcContentTop),
        left: parseInt(this.calcContentLeft)
      }))
    },
    onClick(){
      if( this.isActive && this.closeOnContentClick ) this.isActive = false
    },
    onClickOutside(e){
      if(this.isActive && !this.isActivatorNodeContains(e)){
        this.isActive = false
      }
    }
  },
  render(h){
    const options = {
      staticClass: 'su-menu',
      class: [
        {
          'su-menu--is-active': this.isActive
        }
      ]
    }
    
    const vnode = this.genContent()
    this.menuContentNode = vnode
    
    return h('div', options, [
      ...this.genActivator(),
      vnode
    ])
  }
})