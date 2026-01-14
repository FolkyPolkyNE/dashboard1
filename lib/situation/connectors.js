// Mock connectors for Situation Monitoring feeds
// Each connector exposes start(callback) => stop()

function randomText(source){
  const samples = [
    `${source}: Update on event at location X`,
    `${source}: User reports disruption to service`,
    `${source}: Viral post with strong emotional framing`,
    `${source}: Eyewitness photo and short commentary`,
    `${source}: Rumor spreading about policy change`
  ]
  return samples[Math.floor(Math.random()*samples.length)]
}

function makeMockConnector(source, interval=2000){
  return {
    start(cb){
      const id = setInterval(()=>{
        const item = {source, text: randomText(source), ts: Date.now(), id: Date.now()+Math.random()}
        cb(item)
      }, interval + Math.floor(Math.random()*interval))
      return ()=>clearInterval(id)
    }
  }
}

export const connectors = {
  twitter: makeMockConnector('Twitter/X'),
  facebook: makeMockConnector('Facebook'),
  instagram: makeMockConnector('Instagram'),
  bluesky: makeMockConnector('BlueSky'),
  youtube: makeMockConnector('YouTube'),
  news: makeMockConnector('BreakingNews'),
  search: makeMockConnector('Search')
}

// Guide helper: real connectors should implement the same `start(cb) => stop()` API.
export const connectorGuide = `
Connector interface:
- export an object with start(cb) where cb receives {source,text,ts,id}
- start should return a stop() function that ceases pushing data

To wire real APIs:
- For Twitter/X: use filtered stream or sampling endpoints; push incoming tweets into cb
- For Facebook/Instagram: use Graph API webhooks or polling
- For YouTube: poll channels or use PubSubHubbub for new videos
- For News: use RSS or a paid news API (e.g., GDELT, NewsAPI)
- For Search: integrate search engine APIs or scraping (respect TOS)

Store API keys in environment variables (see README for naming examples).
`
