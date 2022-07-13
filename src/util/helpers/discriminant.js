import { regExpForUrl } from '../variables'

// 空値判定
export function isEmpty(val){
  if( isNull(val) ) return true

  if( Array.isArray(val) && val.length === 0 ) return true

  if( typeof val === 'string' && val === '' ) return true

  if( typeof val === 'object' && Object.keys(val).length === 0 ) return true

  return false
}

// null、又は未定義判定
export function isNull( val ){
  return (val === undefined || val === null)
}

// 数値判定
export function isNumber( num ){
  if( isNull(num) ) return false

  if( typeof num === 'string' && num === '' ) return false

  return !isNaN(Number(num))
}

// 通常のURL判定
export function isGlobalLink(url){
  const regex = new RegExp(regExpForUrl)

  return regex.test(url)
}

// Node判定
export function isElement(obj){
  try {
    return obj instanceof HTMLElement
  } catch(e) {
    return (typeof obj === 'object') && (obj.nodeType === 1) && (typeof obj.style === 'object') && (typeof obj.ownerDocument === 'object')
  }
}