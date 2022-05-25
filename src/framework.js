import { install } from './install'

import { options } from './options/default'
import { deepMerge } from './util/helpers'

import * as services from './services'

export default class SoloUi {
  static install = install

  static installed = false

  framework = {}

  installed = []

  options = {}

  constructor(userOptions = {}){
    this.options = deepMerge(options, userOptions)

    Object.keys(services).forEach(key => {
      this.use(services[key])
    })
  }

  init(){
    this.installed.forEach((property) => {
      const service = this.framework[property]

      service.framework = this.framework

      service.init()
    })
  }

  use(Service){
    const property = Service.property
    if( this.installed.includes(property) ) return

    this.framework[property] = new Service(this.options, this)
    this.installed.push(property)
  }
}