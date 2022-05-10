import { Breakpoint } from "..";
import { Service } from "../service";

export class Layout extends Service {
  static property = 'layout'

  breakpoint

  gutter = 16

  app = {}
  header = {}
  nav = {}
  main = {}

  thresholds = {
    appWidth: {
      lg: 1200,
      md: 1000
    },
    mainWidth: {
      center: 608
    },
    navWidth: {
      lgUp: 232,
      mdDown: 64,
      mobile: 256
    }
  }

  mobile = false

  narrow = false

  constructor(){
    super()

    this.main.centerWidth = this.thresholds.mainWidth.center
  }

  init(){
    const breakpoint = this.framework[Breakpoint.property]

    breakpoint.setResizeCallback(this.update.bind(this), true)

    this.breakpoint = breakpoint
  }

  update(breakpoint){
    // nav
    const navWidth = breakpoint.lgUp ? this.thresholds.navWidth.lgUp : this.thresholds.navWidth.mdDown
    const navGutterWidth = navWidth + this.gutter

    // app
    this.app.width = breakpoint.lgUp ? this.thresholds.appWidth.lg : breakpoint.mdUp ? this.thresholds.appWidth.md : (navWidth + this.thresholds.mainWidth.center + this.gutter)

    // header
    this.header.width = this.app.width

    // main
    this.main.width = this.app.width - navWidth - this.gutter
    this.main.rightWidth = this.main.width - this.thresholds.mainWidth.center - this.gutter

    // public
    this.mobile = breakpoint.width < (this.app.width + this.gutter)
    this.narrow = !breakpoint.lgUp && !this.mobile

    this.nav.width = !this.mobile ? navWidth : this.thresholds.navWidth.mobile
    this.nav.gutterWidth = !this.mobile ? navGutterWidth : this.nav.width + this.gutter
  }
}