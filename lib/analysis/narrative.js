// Mock narrative and theme analysis
export function extractThemes(text){
  const themes = ['safety','economy','health','security','misinformation']
  return [themes[Math.floor(Math.random()*themes.length)]]
}

export function buildNarrativeMap(items){
  // Build a simple co-occurrence graph of themes
  const nodes = []
  const edges = []
  items.forEach((it, idx)=>{
    const themes = extractThemes(it.text)
    themes.forEach(t=> nodes.push({id: t, label: t}))
    if(themes.length>1){
      edges.push({source:themes[0], target:themes[1], weight:1})
    }
  })
  // dedupe
  const uniq = Object.values(nodes.reduce((acc,n)=>{acc[n.id]=n;return acc},{ }))
  return {nodes:uniq, edges}
}
