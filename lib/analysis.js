// Mock analysis functions for semantic, narrative, and social network analysis.
// These are placeholders — swap with real NLP/SNA libraries or API calls.

function uniq(arr){ return Array.from(new Set(arr)) }

export function semanticAnalysis(texts){
  // returns keywords and simple sentiment aggregate
  const words = texts.flatMap(t=> (t||'').split(/\W+/)).filter(Boolean)
  const counts = {}
  words.forEach(w=>{ const k=w.toLowerCase(); counts[k]=(counts[k]||0)+1 })
  const keywords = Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,10).map(x=>x[0])
  const sentiment = (Math.random()*2-1).toFixed(2)
  return {keywords, sentiment}
}

export function narrativeAnalysis(texts){
  // return mock themes and confidence
  const themes = ['safety','supply','trust','misinfo','coordination']
  const present = uniq(themes.filter(()=>Math.random()>0.6))
  const mapping = present.map(t=>({theme:t, score: (Math.random()*0.6+0.4).toFixed(2)}))
  return {themes: mapping}
}

export function narrativeMap(texts){
  // create mocked nodes and edges for narrative mapping
  const nodes = ['narrative-A','narrative-B','narrative-C','narrative-D'].map((id,i)=>({id, label:id, weight:Math.random()}))
  const edges = []
  for(let i=0;i<nodes.length;i++){
    for(let j=i+1;j<nodes.length;j++){
      if(Math.random()>0.6) edges.push({source:nodes[i].id, target:nodes[j].id, weight:Math.random().toFixed(2)})
    }
  }
  return {nodes, edges}
}

export function socialNetworkAnalysis(items){
  // items: feed items with user fields — produce nodes and edges
  const users = uniq(items.map(i=>i.user)).slice(0,12)
  const nodes = users.map(u=>({id:u, label:u, centrality:Math.random().toFixed(2)}))
  const edges = []
  for(let i=0;i<users.length;i++){
    for(let j=i+1;j<users.length;j++){
      if(Math.random()>0.7) edges.push({source:users[i], target:users[j], weight:(Math.random()).toFixed(2)})
    }
  }
  return {nodes, edges}
}

export default { semanticAnalysis, narrativeAnalysis, narrativeMap, socialNetworkAnalysis }
