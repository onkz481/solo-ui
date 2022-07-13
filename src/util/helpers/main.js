export function insertBefore(parentNode, newNode, referenceNode = null){
  if( !parentNode || !newNode ) return

  return parentNode.insertBefore(newNode, referenceNode)
}

export function insertBeforeAppAbsoluted(newNode, referenceNode = null){
  if( !newNode ) return

  return insertBefore(document.getElementsByClassName('su-app-absoluted__inner')[0], newNode, referenceNode)
}

export function getAppAbsolutedInnerElement(){
  return document.getElementsByClassName('su-app-absoluted__inner')[0]
}

export function setElementStyle(el, prop, val){
  if( !el || !prop || !val ) return
  if( typeof prop !== 'string' || typeof val !== 'string' ) return
  if( !Object.prototype.hasOwnProperty.call(el.style, prop) ) return

  el.style[prop] = val
}

export function deepMerge(target, source, opts){
  const isObject = obj => obj && typeof obj === 'object' && !Array.isArray(obj);
  const isConcatArray = opts && opts.concatArray;

  let result = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    for (const [sourceKey, sourceValue] of Object.entries(source)) {
      const targetValue = target[sourceKey];

      if (isConcatArray && Array.isArray(sourceValue) && Array.isArray(targetValue)) {
        result[sourceKey] = targetValue.concat(...sourceValue);
      }
      else if (isObject(sourceValue) && Object.prototype.hasOwnProperty.call(target, sourceKey)) {
        result[sourceKey] = deepMerge(targetValue, sourceValue, opts);
      }
      else {
        Object.assign(result, {[sourceKey]: sourceValue});
      }
    }
  }
  return result;
}

// $slots 又は $scopedSlots を返す
export function getSlot( vm, name = 'default', data = {} ){
  if( Object.prototype.hasOwnProperty.call(vm.$scopedSlots, name) ) {
    return vm.$scopedSlots[name](data)
  } else if( Object.prototype.hasOwnProperty.call(vm.$slots, name) ) {
    return vm.$slots[name]
  }

  return undefined
}

// 文字列をケバブケースに変換
export function toKebabCase(str){
  if (typeof str !== 'string') return str;

  str = str.replace(/^ *?[A-Z]/, function(allStr) { return allStr.toLowerCase(); });
  str = str.replace(/_/g, '-');
  str = str.replace(/ *?[A-Z]/g, function(allStr) { return '-' + allStr.replace(/ /g, '').toLowerCase(); });
  return str;
}

// 文字列をキャメルケースに変換
export function toCamelCase(str){
  if (typeof str !== 'string') return str;

  str = str.trim().split('-')
  str = str.map((str, index) => {
    if( index === 0 ) return str
    return strUpperFirst(str)
  })
  
  return str.join('')
}

// 先頭文字を大文字に変換して返す
export function strUpperFirst(str){
  if( typeof str !== 'string' || str.length <= 0 ) return

  return `${str[0].toUpperCase()}${str.slice(1)}`
}

// $route パス一致判定('/'を除外して判定、第3引数で完全一致と前方一致の切替)
export function matchRoutePath(path1, path2, prefix = false){
  const arr1 = path1.split('/').filter(str => str.length > 0)
  const arr2 = path2.split('/').filter(str => str.length > 0)

  // 完全一致判定
  if( !prefix && arr1.length !== arr2.length ) return false
  
  let result = false;

  for( let i = 0; i < arr1.length; i++ ){
    if( !arr2[i] ) break

    if( !prefix && arr1[i] !== arr2[i] ) return false

    if( arr1[i] === arr2[i] ) result = true
  }

  return result
}

export function assignProps( vm, component, props = {} ){
  return Object.assign(props, ...Object.keys(component.options.props).map(key => {
    if(vm[key] !== undefined) return { [key]: vm[key] }
  }))
}

export function assignListners( vm, value = {}, pattern = /^.*$/ ){
  return Object.assign(...Object.keys(vm.$listeners).map(key => {
    if( pattern && pattern.test(key) ) return { [key]: vm.$listeners[key] }
  }), value)
}

export function remToPx(rem){
  if( !rem ) return

  const rootSize = parseInt(getComputedStyle(document.documentElement).fontSize)
  rem = parseFloat(rem)
  
  return rootSize * rem
}

// css ルールの追加
export function insertCssKeyframes( name, rule ){
  const styleSheet = document.styleSheets[0]

  styleSheet.insertRule(`@keyframes ${name} ${rule}`, styleSheet.cssRules.length)
}

export function rectangle(el){
  const { x, y, top, bottom, left, right, width, height } = el.getBoundingClientRect()

  return {
    x, y, top, bottom, left, right, width, height
  }
}