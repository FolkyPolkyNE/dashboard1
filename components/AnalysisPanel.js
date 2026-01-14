import { useEffect, useState } from 'react'
import analysis from '../lib/analysis'

export default function AnalysisPanel({items}){
  const [semantic, setSemantic] = useState(null)
  const [narrative, setNarrative] = useState(null)
  const [nmap, setNmap] = useState(null)
  const [sna, setSna] = useState(null)

  useEffect(()=>{
    const texts = items.map(i=>i.text)
    setSemantic(analysis.semanticAnalysis(texts))
    setNarrative(analysis.narrativeAnalysis(texts))
    setNmap(analysis.narrativeMap(texts))
    setSna(analysis.socialNetworkAnalysis(items))
  }, [items])

  return (
    <div className="analysis-panel">
      <h3>Automated Analysis</h3>
      <section>
        <strong>Keywords</strong>
        <div className="chip-list">{semantic? semantic.keywords.map(k=> <span key={k} className="chip">{k}</span>) : '—'}</div>
      </section>
      <section>
        <strong>Narrative Themes</strong>
        <ul>{narrative? narrative.themes.map(t=> <li key={t.theme}>{t.theme} ({t.score})</li>) : '—'}</ul>
      </section>
      <section>
        <strong>Narrative Map</strong>
        <div>Nodes: {nmap? nmap.nodes.length : 0} — Edges: {nmap? nmap.edges.length : 0}</div>
      </section>
      <section>
        <strong>Social Network</strong>
        <div>Users: {sna? sna.nodes.length : 0} — Connections: {sna? sna.edges.length : 0}</div>
      </section>
    </div>
  )
}
