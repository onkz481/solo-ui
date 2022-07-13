// Mixins
import activatable from "../activatable"

// helpers
import { getAppAbsolutedInnerElement, rectangle } from '../../util/helpers'

const typeBoolean = {
  type: Boolean,
  default: false
}

export default {
  mixins: [activatable],
  props: {
    offsetX: typeBoolean,
    offsetY: typeBoolean,
    top: typeBoolean,
    left: typeBoolean,
    right: typeBoolean,
    bottom: typeBoolean,
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
      const innerWidth = getAppAbsolutedInnerElement() ? rectangle(getAppAbsolutedInnerElement()).width : rectangle(this.$root.$el).width - (gutter * 2)

      let left = 0

      if( this.offsetX ){
        if( this.left ){
          const contentL = dAct.left - dCon.width

          left = gutter < contentL ? contentL : 0
        } else {
          const contentL = dAct.right
          const contentR = contentL + dCon.width

          left = innerWidth > contentR ? contentL : innerWidth > dCon.width ? contentL - (contentR - innerWidth) : 0
        }
      } else {
        left = dAct.left
      }

      return innerWidth < (left + dCon.width) ? innerWidth - dCon.width : left
    },
    calcContentTop(){
      const dAct = this.dimensions.activator
      const dCon = this.dimensions.content
      
      let top = 0

      if( this.offsetY ){
        if( this.top ){
          top = this.offsetX ? dAct.bottom - dCon.height : dAct.top - dCon.height
        } else {
          top = this.offsetX ? dAct.top : dAct.bottom
        }
      } else {
        top = dAct.top
      }

      return top
    },
    calcContentWidth(){
      let { activator, content } = this.dimensions

      return activator.width && activator.width > content.width ? activator.width : content.width
    }
  },
  destroyed(){
    if( !this.menuContentNode.elm ) return

    this.menuContentNode.elm.remove()
  },
  methods: {
    setContentDimensions(contentEl, dimensions = this.dimensions){
      let { activator, content } = dimensions

      content = Object.keys(content).length > 0 ? { ...content, ...rectangle(contentEl) } : rectangle(contentEl)

      if( activator.width && activator.width > content.width ) content.width = activator.width

      return content
    },
    updateDimensions(){
      if( !this.activatorNode.length > 0 ) return

      const activatorEl = this.activatorNode[0]['elm']
      const contentEl = this.menuContentNode['elm']

      const dimensions = this.dimensions

      // activator
      dimensions.activator = rectangle(activatorEl)
      dimensions.activator.offsetTop = activatorEl.offsetTop
      dimensions.activator.offsetLeft = activatorEl.offsetLeft

      if(contentEl.offsetParent){
        const offsetRect = rectangle(contentEl.offsetParent)
        dimensions.activator.top -= offsetRect.top
        dimensions.activator.left -= offsetRect.left
        dimensions.activator.bottom = dimensions.activator.top + dimensions.activator.height
        dimensions.activator.right = dimensions.activator.left + dimensions.activator.width
      }

      // content
      dimensions.content = rectangle(contentEl)

      this.dimensions = dimensions
    }
  }
}