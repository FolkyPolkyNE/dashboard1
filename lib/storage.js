// Simple client-side storage helper using localStorage and a custom event bus
const KEY_MARKERS = 'app:markers'
const KEY_RECTS = 'app:rectangles'
const KEY_STATS = 'app:stats'

function dispatch(key, value){
  if(typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
  window.dispatchEvent(new CustomEvent('app:storage', {detail:{key, value}}))
}

export function loadMarkers(){
  if(typeof window === 'undefined') return []
  try{return JSON.parse(window.localStorage.getItem(KEY_MARKERS) || '[]') || []}catch(e){return []}
}
export function saveMarkers(markers){
  dispatch(KEY_MARKERS, markers)
}

export function loadRectangles(){
  if(typeof window === 'undefined') return []
  try{return JSON.parse(window.localStorage.getItem(KEY_RECTS) || '[]') || []}catch(e){return []}
}
export function saveRectangles(rects){
  dispatch(KEY_RECTS, rects)
}

export function loadStats(){
  if(typeof window === 'undefined') return {accounts:0,situations:0,ra:0,ops:0}
  try{
    const raw = window.localStorage.getItem(KEY_STATS)
    if(!raw) return {accounts:0,situations:0,ra:0,ops:0}
    return JSON.parse(raw)
  }catch(e){return {accounts:0,situations:0,ra:0,ops:0}}
}
export function saveStats(stats){
  dispatch(KEY_STATS, stats)
}

export function onStorage(fn){
  if(typeof window === 'undefined') return ()=>{}
  const handler = (e)=>{
    if(!e.detail) return
    fn(e.detail.key, e.detail.value)
  }
  window.addEventListener('app:storage', handler)
  return ()=> window.removeEventListener('app:storage', handler)
}
