import Vue from 'vue'

// styles
import './SuTable.scss'

// mixins
import themeable from '../../mixins/themeable'

// components
import { SuBtn, SuIcon } from '../index'

// helpers
import { isNumber } from '../../util/helpers'

export default Vue.extend({
  name: 'SuTable',
  mixins: [
    themeable
  ],
  props: {
    headers: {
      type: Array,
      default: () => ([])
    },
    hideFooter: {
      type: Boolean,
      default: false
    },
    hideTableHeader: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => ([])
    },
    itemsPerPage: {
      type: [String, Number],
      default: 5
    },
    options: {
      type: Object,
      default: () => ({})
    },
    page: {
      type: [String, Number],
      default: 1
    }
  },
  data: () => ({
    internalOptions: {
      page: 1,
      itemsPerPage: 5
    }
  }),
  computed: {
    classes(){
      return [
        this.themeableClass
      ]
    },
    computedItems(){
      return this.items.map((item, idx) => {
        return {
          id: idx,
          ...item
        }
      })
    },
    hasNext(){
      const { page, itemsPerPage } = this.internalOptions

      return (page * itemsPerPage) < this.items.length
    },
    hasPrev(){
      return this.internalOptions.page > 1
    },
    isAll(){
      return this.internalOptions.itemsPerPage < 0
    },
    lastPage(){
      return Math.ceil(this.items.length / this.internalOptions.itemsPerPage)
    },
    total(){
      return this.items.length
    }
  },
  watch: {
    internalOptions: {
      handler(val){
        this.$emit('update:options', val)
      },
      deep: true
    },
    itemsPerPage(val){
      this.internalOptions.itemsPerPage = isNumber(val) ? Number(val) : 5
    },
    page(val){
      this.internalOptions.page = isNumber(val) && Number(val) > 0 ? Number(val) : 1
    }
  },
  mounted(){
    this.updateOptions()
  },
  methods: {
    genFooter(){
      if( this.hideFooter ) return

      return this.$createElement('div', {
        staticClass: 'su-table__footer'
      }, this.genFooterContent())
    },
    genFooterContent(){
      return [
        this.genPagination(),
        this.genPrev(),
        this.genNext(),
      ]
    },
    genIcon( icon ){
      return this.$createElement(SuIcon, {}, [icon])
    },
    genItems(headers = []){
      const { itemsPerPage, page } = this.internalOptions

      const endIndex = itemsPerPage * (page > this.lastPage ? this.lastPage : page)

      const items = this.isAll ? this.computedItems : this.computedItems.slice(endIndex - itemsPerPage, endIndex)

      return items.map(item => {
        return this.genTR(headers.map(key => {
          return this.genTD(item[key])
        }), {
          key: item.id
        })
      })
    },
    genNext(){
      return this.$createElement(SuBtn, {
        class: [
          'ml-2'
        ],
        props: {
          icon: true,
          text: true,
          disabled: !this.hasNext
        },
        on: {
          click: this.onNext
        }
      }, [this.genIcon('mdi-chevron-right')])
    },
    genPagination(){
      return this.$createElement('span', {
        staticClass: 'su-table__footer-pagination'
      }, [
        `Page ${this.internalOptions.page} of ${this.lastPage}`
      ])
    },
    genPrev(){
      return this.$createElement(SuBtn, {
        class: [
          'ml-2'
        ],
        props: {
          icon: true,
          text: true,
          disabled: !this.hasPrev
        },
        on: {
          click: this.onPrev
        }
      }, [this.genIcon('mdi-chevron-left')])
    },
    genTable(){
      return this.$createElement('table', {}, [
        this.genTHead(),
        this.genTBody(),
      ])
    },
    genTBody(){
      const headers = this.headers.map(({ value }) => {
        return value
      })

      const items = this.genItems(headers)

      return this.$createElement('tbody', {}, [items])
    },
    genTD( value ){
      return this.$createElement('td', {
        domProps: {
          innerHTML: value
        }
      })
    },
    genTH( header ){
      const { text } = header

      return this.$createElement('th', {}, [text])
    },
    genTHead(){
      if( this.hideTableHeader ) return
      
      const headers = this.headers.map(header => {
        return this.genTH(header)
      })

      return this.$createElement('thead', {
        staticClass: 'su-table__thead'
      }, [this.genTR(headers)])
    },
    genTR( items, options = {} ){
      return this.$createElement('tr', options, [items])
    },
    onNext(){
      if( !this.hasNext ) return

      this.internalOptions.page++

      this.$emit('update:page', this.internalOptions.page)
    },
    onPrev(){
      if( !this.hasPrev ) return

      this.internalOptions.page--

      this.$emit('update:page', this.internalOptions.page)
    },
    updateOptions(){
      this.internalOptions = {
        ...this.internalOptions,
        ...{
          itemsPerPage: this.itemsPerPage,
          page: this.page
        },
        ...this.options
      }
    }
  },
  render(h){
    return h('div', {
      staticClass: 'su-table',
      class: this.classes
    }, [
      this.genTable(),
      this.genFooter(),
    ])
  }
})