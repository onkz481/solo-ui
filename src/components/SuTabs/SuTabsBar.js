// components
import { SuSlideGroupBase } from "../SuSlideGroup/SuSlideGroup"

export default SuSlideGroupBase.extend({
  name: 'SuTabsBar',
  provide(){
    return {
      tabsBar: this
    }
  },
  computed: {
    classes(){
      return [
        ...SuSlideGroupBase.options.computed.classes.call(this),
        'su-tabs-bar'
      ]
    },
  },
  render(h){
    const render = SuSlideGroupBase.options.render.call(this, h)

    return render
  }
})