import { Service } from '../service';

export class Lang extends Service {
  static property = 'lang'

  internalLang = 'en'
  locales = {}

  constructor(options){
    super()

    const { current, locales } = options[Lang.property]

    let language = current ? current :
      (window.navigator.languages && window.navigator.languages[0]) ||
      window.navigator.language ||
      window.navigator.userLanguage ||
      window.navigator.browserLanguage
    
    this.current = Object.keys(locales).includes(language) ? language : current

    this.locales = locales
  }

  t(key, locale){ 
    key = key.split(/(?<=^[^.]+?)\./);
    locale = locale ? locale : this.locales[this.current]
    
    if(key.length <= 1) return locale[key[0]]

    return this.t(key[1], locale[key[0]])
  }

  get current(){
    return this.internalLang
  }
  set current(lang){
    document.documentElement.setAttribute('lang', lang);

    this.internalLang = lang
  }
}