import Vue from 'vue'

// helpers
import { htmlTags } from '../../util/variables'

export function generator(
  defaultValue = 'div'
){
  return Vue.extend({
    props: {
      tag: {
        type: String,
        default: defaultValue
      }
    },
    computed: {
      computedTag(){
        return htmlTags.includes(this.tag) ? this.tag : defaultValue
      }
    }
  })
}