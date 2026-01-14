import Layout from '../components/Layout'

const boxes = [
  'Raw Intelligence',
  'Intelligence Products',
  'Psychological',
  'Cognitive',
  'Behavioral',
  'Cultural'
]

export default function Research(){
  return (
    <Layout title="Research & Analysis">
      <h2>Research & Analysis</h2>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12,marginTop:12}}>
        {boxes.map(b=> (
          <div key={b} className="stat-card" style={{minHeight:120,display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <div style={{fontSize:14,color:'var(--muted)',marginBottom:6}}>{b}</div>
            <div style={{fontSize:16,fontWeight:600}}>Open</div>
          </div>
        ))}
      </div>

      <p style={{marginTop:18,color:'var(--muted)'}}>Click a box to open the corresponding workspace (placeholder). Replace with real components or links as needed.</p>
    </Layout>
  )
}
