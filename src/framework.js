import { install } from './install';

export default class SoloUi {
    static install = install

    constructor(options = {}){
        // css import
        import('./lib-styles/main.scss'); // app initialize

        const theme = options.theme || 'light';
        document.getElementsByTagName('html')[0].dataset.theme = theme;
    }
}