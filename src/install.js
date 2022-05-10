
export default function install (Vue, args = {}) {

  const components = args.components || {};

  Object.entries(components).forEach(([componentName, component]) => {
      Vue.component(componentName, component);
  });

  Vue.mixin({
    beforeCreate(){
      const options = this.$options
      
      if( options.soloui ){
        options.soloui.init()
        this.$soloui = Vue.observable(options.soloui.framework)
      } else {
        this.$soloui = (options.parent && options.parent.$soloui) || this
      }
    }
  })
}