// Simple SPA navigation and Leaflet map + demo stats
document.addEventListener('DOMContentLoaded', ()=>{
  // Navigation
  const links = document.querySelectorAll('.nav-link');
  links.forEach(l=>{
    l.addEventListener('click', e=>{
      e.preventDefault();
      document.querySelectorAll('.nav-link').forEach(x=>x.classList.remove('active'));
      l.classList.add('active');
      const target = l.dataset.section;
      document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
      const el = document.getElementById(target);
      if(el) el.classList.add('active');
    })
  })

  // Init map (dark tiles)
  const mapEl = document.getElementById('map');
  const map = L.map(mapEl, {zoomControl:true}).setView([20,0], 2);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap &copy; CartoDB',
    maxZoom: 19
  }).addTo(map);

  // Demo markers (random)
  const demoMarkers = [];
  for(let i=0;i<8;i++){
    const lat = (Math.random()*140)-70;
    const lon = (Math.random()*360)-180;
    const m = L.circleMarker([lat,lon], {radius:6, color:'#60a5fa', fillColor:'#60a5fa', fillOpacity:0.9}).addTo(map);
    demoMarkers.push(m);
  }

  // Stats demo updater
  const activeAccountsEl = document.getElementById('activeAccounts');
  const activeSituationsEl = document.getElementById('activeSituations');
  const currentRAEl = document.getElementById('currentRA');
  const currentOpsEl = document.getElementById('currentOps');

  function setNumbers(){
    activeAccountsEl.textContent = (1200 + Math.floor(Math.random()*250)).toLocaleString();
    activeSituationsEl.textContent = (10 + Math.floor(Math.random()*30));
    currentRAEl.textContent = (5 + Math.floor(Math.random()*20));
    currentOpsEl.textContent = (2 + Math.floor(Math.random()*10));
  }
  setNumbers();
  setInterval(()=>{
    setNumbers();
    // move demo markers slightly
    demoMarkers.forEach(m=>{
      const latlng = m.getLatLng();
      m.setLatLng([latlng.lat + (Math.random()-0.5)*2, latlng.lng + (Math.random()-0.5)*2]);
    })
  }, 4000);
});
