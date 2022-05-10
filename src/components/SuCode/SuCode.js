import Prism from 'prismjs'

//components
import SuSheet from '../SuSheet'

export default SuSheet.extend({
  name: 'SuCode',
  props: {
    lang: {
      type: String,
      default: 'js'
    },
    code: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: (window.matchMedia('(prefers-color-scheme: dark)').matches == true) ? 'dark' : 'light'
    }
  },
  computed: {
    classes(){
      return [
        'su-code',
        ...SuSheet.options.computed.classes.call(this)
      ]
    },
    styles(){
      return [
        ...SuSheet.options.computed.styles.call(this)
      ]
    },
    highlight(){
      return Prism.highlight(this.code, Prism.languages[this.lang]);
    }
  },
  mounted(){
    this.initialize();
  },
  methods: {
    initialize(){
      this.$refs.SuCode.dataset.theme = this.theme;
    }
  },
  render(h){
    const code = this.$createElement('code', {
      domProps: {
        innerHTML: this.highlight
      }
    })

    const pre = this.$createElement('pre', {}, [code])

    return h(this.tag, {
      class: this.classes,
      style: this.styles,
      ref: 'SuCode'
    }, [pre])
  }
})