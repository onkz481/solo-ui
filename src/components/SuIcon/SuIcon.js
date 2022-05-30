import Vue from 'vue'

// styles
import './SuIcon.scss'

// mixins
import themeable from '../../mixins/themeable'
import colorable from '../../mixins/colorable'
import sizeable from '../../mixins/sizeable'

// components
import { SuImg } from '../SuImg'

//helpers
import { toCamelCase } from '../../util/helpers'

export default Vue.extend({
  name: 'SuIcon',
  mixins: [themeable, colorable, sizeable],
  props: {
    color: {
      type: String,
      default: undefined
    },
    text: {
      type: Boolean,
      default: true
    },
    outlined: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    src: {
      type: [String, Object],
      default: undefined
    }
  },
  data: () => ({
    icon: null
  }),
  computed: {
    classes(){
      return [
        this.themeableClass,
        this.colorableClasses,
        this.sizeableClasses,
        {
          'su-icon--is-disabled': this.disabled
        }
      ]
    },
    styles(){
      return [
        this.colorableInlines
      ]
    }
  },
  methods: {
    genIcon(){
      if( this.src ) return this.genImg()

      if( !this.$slots.default || !this.$slots.default[0] || !this.$slots.default[0].text ) return

      const icon = this.$slots.default[0].text.trim()

      if( this.isSvgPath(icon) ) return this.genSvg(icon)

      switch( this.$soloui.icon.use ){
        case 'mdiSvg':
          return this.genMdiSvg(icon)
        default:
          return icon
      }
    },
    genImg(){
      return this.$createElement(SuImg, {
        class: [
          'su-icon__img'
        ],
        props: {
          src: this.src
        }
      })
    },
    genMdiSvg(icon){
      const icons = this.$soloui.icon.icons
      const iconName = toCamelCase(icon)

      if( !Object.keys(icons).includes(iconName) ) return

      return this.genSvg(icons[iconName])
    },
    genSvg(d){
      if( !this.isSvgPath(d) ) return

      const path = this.$createElement('path', {
        attrs: {
          d: d
        }
      })

      return this.$createElement('svg', {
        class: [
          'su-icon__svg'
        ],
        attrs: {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 24 24',
          role: 'img',
          'aria-hidden': 'true'
        }
      }, [
        path
      ])
    },
    isSvgPath(str){
      return (/^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(str) && /[\dz]$/i.test(str) && str.length > 4)
    }
  },
  render(h){
    const icon = this.genIcon()
    const isMdi = typeof icon === 'string'

    return h('span', {
      staticClass: 'su-icon',
      class: [
        ...this.classes,
        isMdi && `mdi ${icon}`
      ],
      style: this.styles
    }, [
      !isMdi && icon
    ])
  }
})