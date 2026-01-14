import { useEffect, useState } from 'react'
import connectors from '../lib/mockConnectors'

export default function FeedBox({source, onSelectItem}){
  const [items, setItems] = useState([])
  const [paused, setPaused] = useState(false)

  useEffect(()=>{
    const unsub = connectors.subscribeMockFeed(source, (item)=>{
      if(paused) return
      setItems(prev=>[item, ...prev].slice(0,60))
    }, 3500)
    return ()=>unsub()
  }, [source, paused])

  useEffect(()=>{
    // seed with recent
    const seed = connectors.fetchRecentMock(source, 6)
    setItems(seed)
  }, [source])

  return (
    <div className="feed-box">
      <div className="feed-header">
        <div className="feed-title">{source}</div>
        <div className="feed-controls">
          <button onClick={()=>setPaused(p=>!p)}>{paused? 'Resume' : 'Pause'}</button>
          <button onClick={()=>setItems([])}>Clear</button>
        </div>
      </div>
      <div className="feed-list">
        {items.map(it=> (
          <div key={it.id} className="feed-item" onClick={()=>onSelectItem&&onSelectItem(it)}>
            <div className="feed-meta">{it.user} · {new Date(it.ts).toLocaleTimeString()}</div>
            <div className="feed-text">{it.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
