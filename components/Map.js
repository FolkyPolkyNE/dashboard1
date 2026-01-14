import { MapContainer, TileLayer, CircleMarker, useMap } from 'react-leaflet'
import { useEffect, useState } from 'react'

function RandomMarkers(){
  const [markers, setMarkers] = useState([])
  const map = useMap()
  useEffect(()=>{
    const list = []
    for(let i=0;i<8;i++){
      list.push([(Math.random()*140)-70, (Math.random()*360)-180])
    }
    setMarkers(list)
    map.setView([20,0],2)
  }, [])

  return (<>
    {markers.map((m,idx)=> (
      <CircleMarker key={idx} center={m} radius={6} pathOptions={{color:'#60a5fa', fillColor:'#60a5fa', fillOpacity:0.9}} />
    ))}
  </>)
}

export default function Map(){
  return (
    <div className="map-wrap">
      <MapContainer center={[20,0]} zoom={2} style={{height:'100%', width:'100%'}}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap &amp; CartoDB' />
        <RandomMarkers />
      </MapContainer>
    </div>
  )
}
