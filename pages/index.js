import dynamic from 'next/dynamic'
import Layout from '../components/Layout'
import StatCard from '../components/StatCard'
import { useEffect, useState } from 'react'

const Map = dynamic(()=>import('../components/Map'), { ssr:false })

const storage = require('../lib/storage')

export default function Home(){
  const [stats, setStats] = useState({accounts:0, situations:0, ra:0, ops:0})

  useEffect(()=>{
    const s = storage.loadStats()
    setStats(s)
    const unsub = storage.onStorage((key, value)=>{
      if(key.endsWith('app:stats') || key.indexOf('app:stats')!==-1){
        setStats(value)
      }
      // generic handler: if stats changed elsewhere update
      if(key === 'app:stats') setStats(value)
    })
    return ()=> unsub()
  }, [])

  function updateStat(k, delta){
    const next = {...stats, [k]: Math.max(0, Number(stats[k]||0) + delta)}
    setStats(next)
    storage.saveStats(next)
  }

  return (
    <Layout title="Dashboard">
      <div className="stats-row">
        <StatCard label="Active Accounts" value={stats.accounts} />
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          <button onClick={()=>updateStat('accounts',1)}>+ Account</button>
          <button onClick={()=>updateStat('accounts',-1)}>- Account</button>
        </div>

        <StatCard label="Active Situations" value={stats.situations} />
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          <button onClick={()=>updateStat('situations',1)}>+ Sit</button>
          <button onClick={()=>updateStat('situations',-1)}>- Sit</button>
        </div>

        <StatCard label="Current R&A" value={stats.ra} />
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          <button onClick={()=>updateStat('ra',1)}>+ R&A</button>
          <button onClick={()=>updateStat('ra',-1)}>- R&A</button>
        </div>

        <StatCard label="Current Ops" value={stats.ops} />
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          <button onClick={()=>updateStat('ops',1)}>+ Ops</button>
          <button onClick={()=>updateStat('ops',-1)}>- Ops</button>
        </div>
      </div>
      <div className="map-container">
        <Map />
      </div>
    </Layout>
  )
}
