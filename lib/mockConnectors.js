// Mock connectors for social platforms and news/search feeds.
// Replace these with real API integrations. Each connector exposes a subscribe function
// that accepts a callback and returns an unsubscribe function.

function randChoice(arr){ return arr[Math.floor(Math.random()*arr.length)] }
function nowIso(offset=0){ return new Date(Date.now()+offset).toISOString() }

const USERS = ['alice','bob','charlie','delta','echo','foxtrot']
const TEMPLATES = [
  'Breaking: {topic} is trending in {place}.',
  'New report indicates {topic} impact on {place}.',
  'Discussion around {topic} continues. Key thread: {url}',
  'Analysis: {topic} narratives show rising engagement among {group}.',
  'Watch: coordinated posts on {topic} amplify certain themes.'
]

function makeItem(source){
  const topic = randChoice(['election', 'health', 'evacuation', 'aid', 'rumor', 'supply-chain', 'event'])
  const place = randChoice(['Region A','City B','Country C','Global'])
  const tpl = randChoice(TEMPLATES)
  const text = tpl.replace('{topic}', topic).replace('{place}', place).replace('{group}', randChoice(['youth','activists','influencers'])).replace('{url}', 'https://example.com')
  return {
    id: `${source}-${Date.now()}-${Math.floor(Math.random()*1000)}`,
    source,
    user: randChoice(USERS),
    text,
    ts: nowIso(),
    sentiment: (Math.random()*2-1).toFixed(2),
    metadata: {topic, place}
  }
}

export function subscribeMockFeed(source, cb, intervalMs=4000){
  // immediately send a batch
  const initial = Array.from({length:3}).map(()=>makeItem(source))
  initial.forEach(i=>cb(i))
  const id = setInterval(()=>{
    const item = makeItem(source)
    cb(item)
  }, intervalMs + Math.floor(Math.random()*2000))
  return ()=>clearInterval(id)
}

export function fetchRecentMock(source, count=20){
  return Array.from({length:count}).map(()=>makeItem(source))
}

export default { subscribeMockFeed, fetchRecentMock }
