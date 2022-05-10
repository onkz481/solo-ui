// mixins
import colorable from '../../mixins/colorable'
import routable from '../../mixins/routable'
import { factory as GroupableFactory } from '../../mixins/groupable'
import toggleable from '../../mixins/toggleable'

import Vue from 'vue'

export default Vue.extend({
  name: 'SuListItem',
  mixins: [colorable, routable, GroupableFactory('listItemGroup'), toggleable],
  props: {
    text: {
      type: Boolean,
      default: true
    },
    twoLine: {
      type: Boolean,
      default: false
    },
    threeLine: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    hasIcon: false,
    hasIconIsFirst: false,
    internalClass: 'su-list-item--active'
  }),
  computed: {
    classes(){
      return [
        'su-list-item',
        ...routable.options.computed.classes.call(this),
        this.isActive && this.colorableClasses,
        {
          'su-list-item--is-link': this.isLink,
          'su-list-item--has-icon': this.hasIcon,
          'su-list-item--has-icon--is-first': this.hasIconIsFirst,
          'su-list-item--two-line': this.twoLine,
          'su-list-item--three-line': this.threeLine
        }
      ];
    },
    styles(){
      return [
        this.isActive && this.colorableInlines
      ]
    }
  },
  mounted(){
    this.initialize()
  },
  methods: {
    initialize(){
      if( this.$slots.default !== undefined ){
        this.hasIcon = this.$slots.default.some(vnode => vnode.child && vnode.child.$options._componentTag === 'su-list-item-icon');

        if( this.$slots.default[0].child && this.$slots.default[0].child.$options._componentTag === 'su-list-item-icon' ){
          this.hasIconIsFirst = true;

          this.$slots.default[0].child.isFirst = true;
        }
      }
    },
    onClick(){
      this.$emit('click')
    },
    toggle(){
      if( this.to && this.toggleValue === undefined )
        this.isActive = !this.isActive

      this.$emit('change')
    }
  },
  render(h){
    const tag = this.to ? 'router-link' : this.tag
    const data = {
      class: this.classes,
      style: this.styles,
      props: {},
      on: {
        click: this.onClick
      }
    }
    
    if( this.to ) data.props.to = this.to

    return h(tag, data, this.$slots.default)
  }
})