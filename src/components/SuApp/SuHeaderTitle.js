// components
import { SuAppbarTitle } from '../SuAppbar'

export default SuAppbarTitle.extend({
  name: 'SuHeaderTitle',
  computed: {
    classes(){
      return [
        ...SuAppbarTitle.options.computed.classes.call(this),
        'su-header-title'
      ]
    }
  }
})