// Mixins
import activatable from "../activatable";
import dimensionable from '../dimensionable';

// helpers
import { getAppAbsolutedInnerElement } from '../../util/helpers'

export default {
  mixins: [activatable, dimensionable],
  props: {
    offsetX: Boolean,
    offsetY: Boolean,
    top: Boolean,
    left: Boolean,
    right: Boolean,
    bottom: Boolean,
  },
  data: () => ({
    dimensions: {
      activator: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: 0,
        height: 0,
      },
      content: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: 0,
        height: 0,
      }
    },
    menuContentNode: {}
  }),
  computed: {
    calcContentLeft(){
      const dAct = this.dimensions.activator
      const dCon = this.dimensions.content

      const gutter = this.$soloui.layout.gutter
      const gutterWidth = getAppAbsolutedInnerElement() ? this.rectangle(getAppAbsolutedInnerElement()).width : this.rectangle(this.$root.$el).width - (gutter * 2)

      if( this.offsetX ){
        if( this.left ){
          const contentL = dAct.left - dCon.width

          return gutter < contentL ? `${contentL}px` : `0`
        } else {
          const contentL = dAct.right
          const contentR = contentL + dCon.width

          return gutterWidth > contentR ? `${contentL}px` : gutterWidth > dCon.width ? `${contentL - (contentR - gutterWidth)}px` : '0'
        }
      } else {
        return `${dAct.left}px`;
      }
    },
    calcContentTop(){
      const dAct = this.dimensions.activator
      const dCon = this.dimensions.content
      
      if( this.offsetY ){
        if( this.top ){
          return this.offsetX ? `${dAct.bottom - dCon.height}px` : `${dAct.top - dCon.height}px`
        } else {
          return this.offsetX ? `${dAct.top}px` : `${dAct.bottom}px`
        }
      } else {
        return `${dAct.top}px`;
      }
    },
  },
  methods: {
    updateDimensions(){
      if( !this.activatorNode.length > 0 ) return

      const activator = this.activatorNode[0]['elm']
      const content = this.menuContentNode['elm']

      const dimensions = this.dimensions

      dimensions.activator = this.rectangle(activator)
      dimensions.activator.offsetTop = activator.offsetTop
      dimensions.activator.offsetLeft = activator.offsetLeft

      if(content.offsetParent){
        const offsetRect = this.rectangle(content.offsetParent)
        dimensions.activator.top -= offsetRect.top
        dimensions.activator.left -= offsetRect.left
        dimensions.activator.bottom = dimensions.activator.top + dimensions.activator.height
        dimensions.activator.right = dimensions.activator.left + dimensions.activator.width
      }

      dimensions.content = this.rectangle(content)

      this.dimensions = dimensions
    }
  }
}