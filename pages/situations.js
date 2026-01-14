import Layout from '../components/Layout'
import FeedBox from '../components/FeedBox'
import { connectors, connectorGuide } from '../lib/situation/connectors'
import { analyzeTextSemantic } from '../lib/analysis/semantic'
import { buildNarrativeMap } from '../lib/analysis/narrative'
import { computeSNA } from '../lib/analysis/sna'
import { aggregateSignals } from '../lib/analysis/psych'
import { useEffect, useState } from 'react'

const feeds = [
  {key:'twitter', label:'Twitter / X'},
  {key:'facebook', label:'Facebook'},
  {key:'instagram', label:'Instagram'},
  {key:'bluesky', label:'BlueSky'},
  {key:'youtube', label:'YouTube'},
  {key:'news', label:'Breaking News'},
  {key:'search', label:'Search Engines'}
]

export default function Situations(){
  const [sampleItems, setSampleItems] = useState([])
  const [semanticResults, setSemanticResults] = useState([])
  const [narrative, setNarrative] = useState({nodes:[],edges:[]})
  const [sna, setSna] = useState(null)
  const [psychAgg, setPsychAgg] = useState(null)

  useEffect(()=>{
    // small subscriber to mock connectors: collect a rolling sample for analysis
    const stops = []
    feeds.forEach(f=>{
      const c = connectors[f.key]
      if(!c) return
      const stop = c.start(item=>{
        setSampleItems(prev=>{
          const next = [item, ...prev].slice(0,200)
          // run light analysis
          setSemanticResults(s=>[...s.slice(0,199), {id:item.id, result: analyzeTextSemantic(item.text)}])
          setNarrative(n=> buildNarrativeMap(next))
          // mock SNA using simple source co-occurrence
          setSna(computeSNA(next.slice(0,50).map((it,idx)=>({source: it.source||'unknown', target: 'topic'+(idx%5)})).map(x=>({source:x.source,target:x.target}))))
          setPsychAgg(aggregateSignals(next.slice(0,50)))
          return next
        })
      })
      stops.push(stop)
    })
    return ()=> stops.forEach(s=>s())
  }, [])

  return (
    <Layout title="Situation Monitoring">
      <h2>Situation Monitoring</h2>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:12}}>
        {feeds.map(f=> (
          <FeedBox key={f.key} name={f.label} startFeed={(cb)=> connectors[f.key].start(cb)} />
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:12,marginTop:12}}>
        <div className="analysis-panel">
          <h3>Semantic Analysis (sample)</h3>
          <div style={{maxHeight:200,overflow:'auto'}}>
            {semanticResults.slice(-30).reverse().map(s=> (
              <div key={s.id} style={{padding:8,borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
                <div style={{fontSize:12,color:'var(--muted)'}}>{s.id}</div>
                <div>Sentiment: {s.result.sentiment} • Keywords: {s.result.keywords.join(', ')}</div>
              </div>
            ))}
          </div>

          <h3 style={{marginTop:12}}>Narrative Map (mock)</h3>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {narrative.nodes.map(n=> (
              <div key={n.id} className="stat-card" style={{padding:'6px 10px'}}>{n.label}</div>
            ))}
          </div>
        </div>

        <div>
          <div className="analysis-panel">
            <h3>Social Network Analysis</h3>
            {sna ? (
              <div>
                <div>Top nodes:</div>
                <ol>
                  {sna.ranked.slice(0,5).map(n=> <li key={n.id}>{n.id} ({n.score})</li>)}
                </ol>
              </div>
            ) : <div className="muted">No data</div>}
          </div>

          <div className="analysis-panel" style={{marginTop:12}}>
            <h3>Psych/Cog/Behavioral/Cultural Signals</h3>
            {psychAgg ? (
              <div>
                <div>Sample count: {psychAgg.count}</div>
                <div>Avg arousal: {psychAgg.avgArousal.toFixed(2)}</div>
                <div>Avg valence: {psychAgg.avgValence.toFixed(2)}</div>
              </div>
            ) : <div className="muted">No data</div>}
          </div>

          <div className="analysis-panel" style={{marginTop:12}}>
            <h3>Connector Guide</h3>
            <pre style={{whiteSpace:'pre-wrap',fontSize:12}}>{connectorGuide}</pre>
          </div>
        </div>
      </div>
    </Layout>
  )
}
