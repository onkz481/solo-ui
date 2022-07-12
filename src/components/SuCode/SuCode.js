import Prism from 'prismjs'

// styles
import './SuCode.scss'

//components
import SuSheet from '../SuSheet'
import { SuBtn } from '../SuBtn'
import { SuIcon } from '../SuIcon'
import { SuLabel } from '../SuLabel'

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
    languages: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    themes: ['dark', 'light'],
    highlightCode: null
  }),
  computed: {
    classes(){
      return [
        'su-code',
        ...SuSheet.options.computed.classes.call(this)
      ]
    },
    computedLang(){
      const { lang } = this

      return Prism.languages[lang] ? lang : 'js'
    },
    computedTheme(){
      if( !this.theme ) return this.$soloui.theme.current

      return this.themes.includes(this.theme) ? this.theme : this.$soloui.theme.systemTheme()
    },
    styles(){
      return [
        ...SuSheet.options.computed.styles.call(this)
      ]
    },
  },
  watch: {
    lang: 'genCode'
  },
  mounted(){
    this.importLanguages()
    
    this.genCode()
  },
  methods: {
    genCode(){
      if( !Prism.languages[this.computedLang] ) return

      this.highlightCode = Prism.highlight(this.code, Prism.languages[this.computedLang])
    },
    genLabel(){
      return this.$createElement(SuLabel, {
        props: {
          small: true
        }
      }, [this.computedLang])
    },
    genStatus(){
      const copyIcon = this.$createElement(SuIcon, {
      }, ['mdi-content-copy'])

      const copyBtn = this.$createElement(SuBtn, {
        props: {
          icon: true,
          text: true
        },
        on: {
          click: this.onCopy
        }
      }, [copyIcon])

      return this.$createElement('div', {
        staticClass: 'su-code__status'
      }, [
        copyBtn,
        this.genLabel()
      ])
    },
    importLanguages(){
      if( !Array.isArray(this.languages) && this.languages.length <= 0 ) return

      this.languages.forEach(language => {
        if( !Object.keys(Prism.languages).includes(language) ){
          import(`prismjs/components/prism-${language}`).then(() => {
            this.genCode()
          })
        }
      })
    },
    onCopy(){
      if( !navigator.clipboard ) return

      navigator.clipboard.writeText(this.code)
    }
  },
  render(h){
    const code = this.$createElement('code', {
      domProps: {
        innerHTML: this.highlightCode
      }
    })

    const pre = this.$createElement('pre', {}, [code])

    return h(this.tag, this[this.text ? 'setTextColor' : 'setBackgroundColor']({
      class: this.classes,
      style: this.styles,
      attrs: {
        'data-theme': this.computedTheme
      }
    }), [
      pre,
      this.genStatus()
    ])
  }
})