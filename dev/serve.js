import Vue from 'vue';
import Dev from './serve.vue';
// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and it's corresponding "Vue.use" call
import '../src/lib-styles/main.scss';
import SoloUi from '@/entry.esm';
Vue.use(SoloUi);

Vue.config.productionTip = false;

new Vue({
  solo: new SoloUi({
    theme: (window.matchMedia('(prefers-color-scheme: dark)').matches == true) ? 'dark' : 'light'
  }),
  render: (h) => h(Dev),
}).$mount('#app');
