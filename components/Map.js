import { MapContainer, TileLayer, Marker, Popup, useMap, Rectangle } from 'react-leaflet'
import L from 'leaflet'
import { useEffect, useState, useRef } from 'react'

function MapController({mode, setMode, markers, setMarkers, rectangles, setRectangles}){
  const map = useMap()
  const drawingRef = useRef(null)
  const startRef = useRef(null)

  useEffect(()=>{
    map.setView([20,0],2)
  }, [map])

  useEffect(()=>{
    function onMapClick(e){
      if(mode === 'add'){
        const id = Date.now()+Math.random()
        setMarkers(prev=>[...prev, {id, position: e.latlng, label: ''}])
      }
    }

    function onMouseDown(e){
      if(mode !== 'draw') return
      startRef.current = e.latlng
      drawingRef.current = L.rectangle([e.latlng, e.latlng], {color:'#60a5fa', weight:2}).addTo(map)
    }

    function onMouseMove(e){
      if(mode !== 'draw' || !drawingRef.current || !startRef.current) return
      drawingRef.current.setBounds([startRef.current, e.latlng])
    }

    function onMouseUp(e){
      if(mode !== 'draw' || !drawingRef.current || !startRef.current) return
      const bounds = drawingRef.current.getBounds()
      const id = Date.now()+Math.random()
      setRectangles(prev=>[...prev, {id, bounds: bounds.toBBoxString()}])
      map.removeLayer(drawingRef.current)
      drawingRef.current = null
      startRef.current = null
    }

    map.on('click', onMapClick)
    map.on('mousedown', onMouseDown)
    map.on('mousemove', onMouseMove)
    map.on('mouseup', onMouseUp)

    return ()=>{
      map.off('click', onMapClick)
      map.off('mousedown', onMouseDown)
      map.off('mousemove', onMouseMove)
      map.off('mouseup', onMouseUp)
    }
  }, [map, mode, setMarkers, setRectangles])

  return null
}

export default function Map(){
  const [mode, setMode] = useState('none')
  const [markers, setMarkers] = useState([])
  const [rectangles, setRectangles] = useState([])

  useEffect(()=>{
    // initialize empty view or add seeded data if desired
  }, [])

  function handleMarkerClick(ev, marker){
    if(mode === 'remove'){
      setMarkers(prev=>prev.filter(m=>m.id !== marker.id))
    } else if(mode === 'label'){
      const txt = window.prompt('Label for marker', marker.label || '')
      if(txt !== null){
        setMarkers(prev=>prev.map(m=> m.id===marker.id ? {...m, label: txt} : m))
      }
    }
  }

  function removeRectangle(id){
    setRectangles(prev=>prev.filter(r=>r.id !== id))
  }

  return (
    <div className="map-wrap" style={{position:'relative'}}>
      <div className="map-controls">
        <button onClick={()=>setMode(mode==='add' ? 'none' : 'add')} className={mode==='add' ? 'active' : ''}>Add Marker</button>
        <button onClick={()=>setMode(mode==='label' ? 'none' : 'label')} className={mode==='label' ? 'active' : ''}>Label Marker</button>
        <button onClick={()=>setMode(mode==='remove' ? 'none' : 'remove')} className={mode==='remove' ? 'active' : ''}>Remove</button>
        <button onClick={()=>setMode(mode==='draw' ? 'none' : 'draw')} className={mode==='draw' ? 'active' : ''}>Draw Box</button>
        <button onClick={()=>{ setMarkers([]); setRectangles([]); setMode('none')}}>Clear All</button>
      </div>

      <MapContainer center={[20,0]} zoom={2} style={{height:'100%', width:'100%'}}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap &amp; CartoDB' />
        <MapController mode={mode} setMode={setMode} markers={markers} setMarkers={setMarkers} rectangles={rectangles} setRectangles={setRectangles} />

        {markers.map(m=> (
          <Marker key={m.id} position={m.position} eventHandlers={{click:(ev)=>handleMarkerClick(ev,m)}}>
            {m.label ? <Popup>{m.label}</Popup> : null}
          </Marker>
        ))}

        {rectangles.map(r=>{
          // bounds stored as bbox string "southWest_lng,southWest_lat,eastNorth_lng,eastNorth_lat"
          const parts = r.bounds.split(',').map(Number)
          const south = parts[1]
          const west = parts[0]
          const north = parts[3]
          const east = parts[2]
          const bounds = [[south, west],[north, east]]
          return (
            <Rectangle key={r.id} bounds={bounds} pathOptions={{color:'#60a5fa', weight:2}} eventHandlers={{click:()=>{ if(mode==='remove') removeRectangle(r.id) }}} />
          )
        })}
      </MapContainer>
    </div>
  )
}
