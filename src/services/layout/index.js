import { Breakpoint } from "..";
import { Service } from "../service";

export class Layout extends Service {
  static property = 'layout'

  breakpoint

  gutter = 16
  navNarrowWidth = 64

  thresholds = {
    lg: 1200,
    md: 1000,
    sm: 688
  }

  app = {}
  header = {
    height: 72
  }
  nav = {
    lgUp: 232,
    mobile: 256
  }
  main = {
    right: 328
  }

  mobile = false
  narrow = false

  constructor(options){
    super()

    const props = options[Layout.property]

    this.thresholds = Object.assign({}, this.thresholds, props.thresholds)
    this.nav = Object.assign({}, this.nav, props.nav)
    this.main = Object.assign({}, this.main, props.main)
  }

  init(){
    const breakpoint = this.framework[Breakpoint.property]

    breakpoint.setResizeCallback(this.update.bind(this), true)

    this.breakpoint = breakpoint
  }

  update(breakpoint){
    // nav
    const navWidth = breakpoint.lgUp ? this.nav.lgUp : this.navNarrowWidth
    const navGutterWidth = navWidth + this.gutter

    // app
    this.app.width = breakpoint.lgUp ? this.thresholds.lg : breakpoint.mdUp ? this.thresholds.md : this.thresholds.sm

    // header
    this.header.width = this.app.width

    // main
    this.main.width = this.app.width - navWidth - this.gutter
    this.main.center = this.main.width - this.main.right - this.gutter

    // public
    this.mobile = breakpoint.width < (this.app.width + this.gutter)
    this.narrow = !breakpoint.lgUp && !this.mobile

    this.nav.width = !this.mobile ? navWidth : this.nav.mobile
    this.nav.gutterWidth = !this.mobile ? navGutterWidth : this.nav.width + this.gutter
  }
}