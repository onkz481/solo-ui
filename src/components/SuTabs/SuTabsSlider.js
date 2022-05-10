// mixins
import colorable from '../../mixins/colorable'

export default {
  name: 'SuTabsSlider',
  mixins: [colorable],
  render(h){
    return h('div', {
      staticClass: 'su-tabs-slider',
      class: [
        this.colorableClasses
      ],
      style: [
        this.colorableInlines
      ]
    })
  }
}