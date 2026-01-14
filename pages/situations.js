import Layout from '../components/Layout'
import FeedBox from '../components/FeedBox'
import AnalysisPanel from '../components/AnalysisPanel'
import { useState, useMemo } from 'react'

const SOURCES = ['Twitter','Facebook','Instagram','BlueSky','YouTube','BreakingNews','Search']

export default function Situations(){
  const [selected, setSelected] = useState(null)
  const [collected, setCollected] = useState([])

  function handleSelect(item){
    setSelected(item)
    setCollected(prev=>[item, ...prev].slice(0,200))
  }

  const itemsForAnalysis = useMemo(()=> collected, [collected])

  return (
    <Layout title="Situation Monitoring">
      <h2>Situation Monitoring</h2>
      <p style={{color:'var(--muted)'}}>Live mock feeds are provided. Replace connectors with real APIs to collect live data.</p>

      <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:12,marginTop:12}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
          {SOURCES.map(s=> (
            <FeedBox key={s} source={s} onSelectItem={handleSelect} />
          ))}
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <AnalysisPanel items={itemsForAnalysis} />
          <div className="stat-card">
            <h4>Selected Item</h4>
            {selected? (
              <div>
                <div style={{color:'var(--muted)'}}>{selected.user} · {new Date(selected.ts).toLocaleString()}</div>
                <div style={{marginTop:8}}>{selected.text}</div>
              </div>
            ) : <div style={{color:'var(--muted)'}}>No item selected. Click an item from any feed to collect and analyze.</div>}
          </div>
        </div>
      </div>
    </Layout>
  )
}
