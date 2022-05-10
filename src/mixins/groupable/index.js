// mixins
import { inject as RegistableInject } from '../registrable'

export function factory(namespace, child, parent){
  return RegistableInject(namespace, child, parent).extend({
    name: 'groupable',
    computed: {
      getActiveClass(){
        if(!this || !this[namespace]) return undefined

        return this[namespace].activeClass
      }
    },
    data: () => ({
      isActive: false
    }),
    created(){
      this[namespace] && this[namespace].register(this)
    },
    beforeDestroy(){
      this[namespace] && this[namespace].unregister(this)
    },
    methods: {
      toggle(){
        this.$emit('change')
      }
    },
  })
}

const Groupable = factory('itemGroup')

export default Groupable