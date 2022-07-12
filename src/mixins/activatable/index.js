// helper
import { getSlot } from '../../util/helpers'

export default {
  data: () => ({
    activatorNode: []
  }),
  destroyed(){
    if( !this.activatorNode.length ) return

    this.activatorNode.forEach(node => {
      node.elm.remove()
    })
  },
  methods: {
    genActivator(){
      const node = getSlot(this, 'activator', { on: this.genActivatorEventListeners() })

      this.activatorNode = node

      return node
    },
    genActivatorEventListeners(){
      return {}
    },
    isActivatorNodeContains(e){
      return this.activatorNode && this.activatorNode[0]['elm'].contains(e.target)
    }
  }
}