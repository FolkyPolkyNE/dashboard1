import Layout from '../components/Layout'
import Link from 'next/link'

const boxes = [
  {key: 'raw-intelligence', label: 'Raw Intelligence'},
  {key: 'intelligence-products', label: 'Intelligence Products'},
  {key: 'psychological-research', label: 'Psychological Research'},
  {key: 'cognitive-research', label: 'Cognitive Research'},
  {key: 'behavioral-research', label: 'Behavioral Research'},
  {key: 'cultural-research', label: 'Cultural Research'},
]

export default function Research(){
  return (
    <Layout title="Research & Analysis">
      <h2>Research & Analysis</h2>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12,marginTop:12}}>
        {boxes.map(b=> (
          <Link key={b.key} href={`/research/${b.key}`} className="stat-card" style={{minHeight:120,display:'flex',flexDirection:'column',justifyContent:'center',textDecoration:'none'}}>
            <div style={{fontSize:14,color:'var(--muted)',marginBottom:6}}>{b.label}</div>
            <div style={{fontSize:16,fontWeight:600}}>Open</div>
          </Link>
        ))}
      </div>

      <p style={{marginTop:18,color:'var(--muted)'}}>Click a box to open the corresponding workspace. Replace placeholders with full views as needed.</p>
    </Layout>
  )
}
