import dynamic from 'next/dynamic'
import Layout from '../components/Layout'
import StatCard from '../components/StatCard'
import { useEffect, useState } from 'react'

const Map = dynamic(()=>import('../components/Map'), { ssr:false })

export default function Home(){
  const [stats, setStats] = useState({accounts:0, situations:0, ra:0, ops:0})
  useEffect(()=>{
    function update(){
      setStats({
        accounts: (1200 + Math.floor(Math.random()*250)).toLocaleString(),
        situations: 10 + Math.floor(Math.random()*30),
        ra: 5 + Math.floor(Math.random()*20),
        ops: 2 + Math.floor(Math.random()*10)
      })
    }
    update();
    const iv = setInterval(update,4000)
    return ()=>clearInterval(iv)
  }, [])

  return (
    <Layout title="Dashboard">
      <div className="stats-row">
        <StatCard label="Active Accounts" value={stats.accounts} />
        <StatCard label="Active Situations" value={stats.situations} />
        <StatCard label="Current R&A" value={stats.ra} />
        <StatCard label="Current Ops" value={stats.ops} />
      </div>
      <div className="map-container">
        <Map />
      </div>
    </Layout>
  )
}
