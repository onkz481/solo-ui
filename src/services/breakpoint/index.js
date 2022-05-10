import { Service } from '../service';

export class Breakpoint extends Service{
  static property = 'breakpoint'

  width = 0
  height = 0

  name = 'xs'

  xs = false
  sm = false
  md = false
  lg = false
  xl = false
  
  smDown = false
  smUp = false
  mdDown = false
  mdUp = false
  lgDown = false
  lgUp = false

  scrollbarWidth
  
  thresholds = {}

  callbacks = []

  constructor(options){
    super()

    const { scrollbarWidth, thresholds } = options[Breakpoint.property]
    
    this.scrollbarWidth = scrollbarWidth
    this.thresholds = thresholds
  }

  init(){
    this.update()

    window.addEventListener('resize', this.onResize.bind(this), {passive: true})
  }

  update(){
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight

    const xs = width < this.thresholds.xs
    const sm = width < this.thresholds.sm && !xs
    const md = width < (this.thresholds.md - this.scrollbarWidth) && !(xs || sm)
    const lg = width < (this.thresholds.lg - this.scrollbarWidth) && !(xs || sm || md)
    const xl = width >= (this.thresholds.lg - this.scrollbarWidth)
    
    this.width = width
    this.height = height

    this.xs = xs
    this.sm = sm
    this.md = md
    this.lg = lg
    this.xl = xl

    this.smDown = (xs || sm) && !(md || lg || xl)
    this.smUp = !xs && (sm || md || lg || xl)
    this.mdDown = (xs || sm || md) && !(lg || xl)
    this.mdUp = !(xs || sm) && (md || lg || xl)
    this.lgDown = (xs || sm || md || lg) && !xl
    this.lgUp = !(xs || sm || md) && (lg || xl)

    switch(true){
      case xs:
        this.name = 'xs'
        break
      case sm:
        this.name = 'sm'
        break
      case md:
        this.name = 'md'
        break
      case lg:
        this.name = 'lg'
        break
      default:
        this.name = 'xl'
        break
    }

    this.runResizeCallbacks()
  }

  onResize(){
    this.update()
  }

  setResizeCallback(callback, isRun = false){
    if( typeof callback !== 'function' ) return false

    if( isRun ) callback(this)
    this.callbacks.push(callback)

    return true
  }
  runResizeCallbacks(){
    if( this.callbacks.length <= 0 ) return

    this.callbacks.forEach(callback => {
      if( typeof callback === 'function' ) callback(this)
    })
  }
}