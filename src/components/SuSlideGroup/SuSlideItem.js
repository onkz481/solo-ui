// components
import { SuItemBase } from '../SuItemGroup/SuItem'

//mixins
import { factory as GroupableFactory } from '../../mixins/groupable'

export default SuItemBase.extend({
  name: 'SuSlideItem',
  mixins: [GroupableFactory('slideGroup', 'su-slide-item', 'su-slide-group')]
})