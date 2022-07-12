// helpers
import { getAppAbsolutedInnerElement } from '../../util/helpers'

const propsSizeOption = {
  type: [Number, String],
  default: undefined,
  required: false
};

export default {
  props: {
    minWidth: propsSizeOption,
    width: propsSizeOption,
    maxWidth: propsSizeOption,
    minHeight: propsSizeOption,
    height: propsSizeOption,
    maxHeight: propsSizeOption,
  },
  computed: {
    dimensionableInlines(){
      let sizes = {};
      ['minWidth', 'width', 'maxWidth', 'minHeight', 'height', 'maxHeight'].forEach(val => {
        if(this[val]) sizes[val] = String(this[val]) + 'px';
      });
      return sizes;
    },
    isWidth(){
      return this.width || this.minWidth || this.maxWidth;
    },
    isHeight(){
      return this.height || this.minHeight || this.maxHeight;
    },
    getWidth(){
      return {
        minWidth: this.minWidth,
        width: this.width,
        maxWidth: this.maxWidth
      };
    },
    getHeight(){
      return {
        minHeight: this.minHeight,
        height: this.height,
        maxHeight: this.maxHeight
      }
    }
  },
  methods: {
    rectangle(el){
      const { x, y, top, bottom, left, right, width, height } = el.getBoundingClientRect()

      return {
        x, y, top, bottom, left, right, width, height
      }
    },
    getAppAbsolutedInnerWidth(width){
      const appAbsolutedInner = getAppAbsolutedInnerElement()
      //const gutter = this.$soloui.layout.gutter
      const gutter = 16
      const gutterWidth = appAbsolutedInner ? this.rectangle(appAbsolutedInner).width : this.rectangle(this.$root.$el).width - (gutter * 2)
      const contentWidth = Number(this.minWidth || this.width) || width

      return gutterWidth > contentWidth ? `${this.minWidth || this.width}px` : '100%'
    }
  }
}