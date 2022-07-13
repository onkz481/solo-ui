// variables
import { definedColors } from '../../util/variables'

// helpers
import { getCssColor, isColor, isCssColor } from "../../util/helpers"

export default {
  props: {
    color: {
      type: String,
      default: undefined,
      required: false
    }
  },
  methods: {
    getCssColor( color = this.color ){
      if( !color ) return

      if( isCssColor(color) ) return color

      return getCssColor( color )
    },
    isColor( color ){
      return isColor(color) || isCssColor(color)
    },
    setBackgroundColor( data = {}, color = this.color ){
      if( isCssColor(color) ){
        const style = {
          'background-color': color,
          'border-color': color
        }

        Array.isArray(data.style) ?
          data.style.push(style) : 
          data.style = { ...data.style, ...style }

      } else if( isColor(color) ){
        
        if( Array.isArray(data.class) ){
          data.class = data.class.filter(className => {
            return !definedColors.includes(className)
          })
          
          data.class.push(color)
        } else {
          data.class = {
            ...data.class,
            [color]: true
          }
        }
      }

      return data
    },
    setTextColor( data = {}, color = this.color ){
      if( isCssColor(color) ){
        const style = {
          'color': color,
          'caret-color': color
        }

        Array.isArray(data.style) ?
          data.style.push(style) : 
          data.style = { ...data.style, ...style }

      } else if( isColor(color) ){
        const [ base, accent ] = color.trim().split(' ', 2)

        if( Array.isArray(data.class) ){
          data.class = data.class.filter(className => {
            return !definedColors.includes(className)
          })
          
          Array.prototype.push.apply(data.class, accent ? [`${base}--text`, accent] : [`${base}--text`])
        } else {
          data.class = {
            ...data.class,
            [`${base}--text`]: true
          }

          if( accent ){
            data.class[accent] = true
          }
        }
      }

      return data
    }
  }
}