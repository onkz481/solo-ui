// components
import { SuBtn } from '../SuBtn'

// helpers
import { getSlot } from '../../util/helpers' 

import Vue from 'vue'

export default Vue.extend({
  name: 'SuDataList',
  props: {
    id: {
      type: String,
      default: 'id',
      required: false
    },
    items: {
      type: Array,
      default: () => {
        return [];
      },
      required: false
    },
    to: {
      type: Number,
      default: 0,
      required: false
    },
    total: {
      type: Number,
      default: 1,
      required: false
    },
    loading: {
      type: Boolean,
      default: false,
      required: false
    },
    emptyText: {
      type: String,
      default: null,
      required: false
    },
    mostBottomText: {
      type: String,
      default: null,
      required: false
    }
  },
  computed: {
    isMostBottom(){
      return this.total <= this.to
    },
    getEmptyText(){
      return (this.emptyText) ? this.emptyText : this.$soloui.lang.t('su-data-list.empty_text')
    },
    getMostBottomText(){
      return (this.mostBottomText) ? this.mostBottomText : this.$soloui.lang.t('su-data-list.most_bottom_text')
    }
  },
  methods: {
    genItems(){
      if( !this.items.length ) return

      const items = this.items.map(item => getSlot(this, 'default', { item: item })[0])

      return items
    },
    genMostBottom(){
      const empty = this.$createElement('span', {}, [this.getEmptyText])

      const mostBottomText = this.$createElement('span', {}, [this.getMostBottomText])

      const button = this.$createElement(SuBtn, {
        props: {
          text: true,
          loading: this.loading
        },
        on: {
          click: this.more
        }
      }, [this.$soloui.lang.t('su-data-list.more')])

      return this.$createElement('div', {
        staticClass: 'su-data-list__most-bottom'
      }, !this.loading && this.items.length <= 0 ? [empty] : [this.isMostBottom ? mostBottomText : button])
    },
    more(){
      this.$emit('more');
    }
  },
  render(h){
    return h('div', {
      staticClass: 'su-data-list'
    },[ 
      this.genItems(),
      this.genMostBottom()
    ])
  }
})