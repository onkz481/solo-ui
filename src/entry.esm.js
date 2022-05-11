
// Import vue components
import * as components from './components'
import SoloUi from './framework'

import './styles/main.scss'

// Create module definition for Vue.use()
export default SoloUi

// install function executed by Vue.use()
const install = SoloUi.install

SoloUi.install = (Vue, args) => {
  install.call(SoloUi, Vue, {
    components,
    ...args
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(SoloUi)
}

// To allow individual component use, export components
// each can be registered via Vue.component()
//export * from '@/components/index'
