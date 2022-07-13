import { mdColors, themeColors } from '../variables'

// helpers
import { toCamelCase } from './main'

export function getCssColor( color ){
  if( !isColor(color) ) return undefined

  const colorSet = Object.assign({}, mdColors, themeColors)
  const splitColors = toCamelCase(color).split(' ')
  
  let result = colorSet[splitColors[0]]
  
  if( typeof result === 'object' )
    result = splitColors[1] ? result[splitColors[1]] : result.base

  return result
}

// マテリアルカラー、またはインラインカラー判定
export function isColor( color ){
  return isMdColor( color ) || isCssColor( color )
}

// マテリアルカラー判定
export function isMdColor( color ){
  if( typeof color !== 'string' ) return false

  const colorSet = new Set(Object.keys(mdColors).concat(Object.keys(themeColors)))
  const splitColors = toCamelCase(color).split(' ')

  if( !(splitColors.length > 0 && colorSet.has(splitColors[0])) ) return false

  if( splitColors.length > 1 ){
    const subColorSet = new Set(Object.keys(mdColors[splitColors[0]]))

    return subColorSet.has(splitColors[1])
  }  

  return true
}

// inline style 判定
export function isCssColor( str ){
  return /^(#|var\(--|(rgb|hsl)a?\()/.test(str)
}