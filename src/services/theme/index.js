import { Service } from "../service"

export class Theme extends Service {
  static property = 'theme'

  internalTheme = 'system'
  internalThemes = []

  constructor(options){
    super()

    if( !options.theme ) return

    if( options.theme.current ) this.current = options.theme.current
    if( options.theme.themes && Array.isArray(options.theme.themes) ) this.themes = options.theme.themes
  }

  systemTheme(){
    return (window.matchMedia('(prefers-color-scheme: dark)').matches == true) ? 'dark' : 'light'
  }
  
  get current(){
    if( this.internalTheme === 'system' || !this.themes.includes(this.internalTheme) ) return this.systemTheme()

    return this.internalTheme
  }
  set current(theme){
    this.internalTheme = theme
  }

  get themes(){
    return ['light', 'dark'].concat(this.internalThemes)
  }
  set themes(themes){
    this.internalThemes = themes
  }
}