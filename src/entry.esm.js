
// Import vue components
import * as components from './lib-components';
import SoloUi from './framework';

// Create module definition for Vue.use()
export default SoloUi

// install function executed by Vue.use()
const install = SoloUi.install;

SoloUi.install = (Vue, args) => {
  install.call(SoloUi, Vue, {
    components,
    ...args
  })
}

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/lib-components/index';
