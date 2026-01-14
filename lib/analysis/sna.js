// Mock social network analysis utilities
export function computeSNA(edges){
  // edges: [{source,target}]
  const nodes = {}
  edges.forEach(e=>{
    nodes[e.source] = (nodes[e.source]||0)+1
    nodes[e.target] = (nodes[e.target]||0)+1
  })
  const ranked = Object.entries(nodes).map(([id,score])=>({id,score})).sort((a,b)=>b.score-a.score)
  return {ranked, degreeMap: nodes}
}
