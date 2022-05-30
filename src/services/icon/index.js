import { Service } from "../service";

// fonts
//import '@mdi/font/css/materialdesignicons.min.css'

export class Icon extends Service {
  static property = 'icon'

  use = 'mdi'
  module = {}

  constructor(options){
    super()

    if( options.icon ){
      if( options.icon.use ) this.use = options.icon.use
    }

    switch( this.use ){
      case 'mdiSvg':
        import('@mdi/js').then(module => {
          this.icons = module
        })
      break
    }
  }

  get icons(){
    return this.module
  }
  set icons(module){
    this.module = module
  }
}