
export function install (Vue, args = {}) {

    const components = args.components || {};

    Object.entries(components).forEach(([componentName, component]) => {
        Vue.component(componentName, component);
    });
}