import Vue from 'vue'

// styles
import './SuImg.scss'

// mixins
import dimensionable from '../../mixins/dimensionable'

export default Vue.extend({
  name: 'SuImg',
  mixins: [
    dimensionable
  ],
  props: {
    src: {
      type: [String, Object],
      default: undefined
    },
    gradient: {
      type: String,
      default: undefined
    },
    position: {
      type: String,
      default: 'center center'
    },
    contain: {
      type: Boolean,
      default: false
    },
    aspectRatio: {
      type: [String, Number],
      default: undefined
    }
  },
  data: () => ({
    image: null,
    isLoading: true,
    hasError: false,
    calcAspectRatio: undefined
  }),
  computed: {
    classes(){
      return [
        'su-img'
      ]
    },
    styles(){
      return [
        this.dimensionableInlines
      ]
    },
    imageClasses(){
      return [
        {
          'su-img__image--preload': this.isLoading,
          'su-img__image--contain': this.contain,
          'su-img__image--cover': !this.contain,
        }
      ]
    },
    imageStyles(){
      return [
        {
          'background-image': this.gradient ? `linear-gradient(${this.gradient}), url(${this.src})` : `url(${this.src})`,
          'background-position': this.position
        }
      ]
    },
    sizerStyle(){
      return [
        this.calcAspectRatio ? {
          paddingBottom: `${(1 / this.calcAspectRatio) * 100}%`
        } : undefined
      ]
    }
  },
  mounted(){
    this.loadImage()
  },
  methods: {
    genSizer(){
      return this.$createElement('div', {
        staticClass: 'su-img__sizer',
        style: this.sizerStyle
      })
    },
    genImage(){
      return this.$createElement('div', {
        staticClass: 'su-img__image',
        class: this.imageClasses,
        style: this.imageStyles
      })
    },
    onLoad(){
      this.isLoading = false
      this.$emit('load', this.src)

      if(this.image){
        if(this.aspectRatio){
          if(typeof this.aspectRatio === 'number') {
            this.calcAspectRatio = this.aspectRatio
          } else {
            let splitAspectRatio = this.aspectRatio.split('/')
            this.calcAspectRatio = splitAspectRatio[0] / splitAspectRatio[1]
          }
        } else {
          if(this.image.naturalWidth && this.image.naturalHeight){
            let width = this.isWidth ? Number(this.isWidth) : this.image.naturalWidth
            let height = this.isHeight ? Number(this.isHeight) : this.image.naturalHeight

            this.calcAspectRatio = width / height
          } else {
            this.calcAspectRatio = 1
          }
        }
      }
    },
    onError(){
      this.hasError = true
      this.$emit('error', this.src)
    },
    loadImage(){
      const image = new Image()
      this.image = image

      image.onload = () => {
        this.onLoad()
      }
      image.onerror = this.onError

      image.src = this.src
      this.$emit('loadstart', this.src)
    }
  },
  render(h){
    return h('div', {
      class: this.classes,
      style: this.styles
    }, [
      this.genSizer(),
      this.genImage()
    ])
  }
})