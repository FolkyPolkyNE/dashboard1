// Mock semantic analysis: returns entities, sentiment, and keywords
export function analyzeTextSemantic(text){
  const keywords = text.split(' ').slice(0,5).map(w=>w.replace(/[\W_]/g,''))
  const sentiment = ['positive','neutral','negative'][Math.floor(Math.random()*3)]
  const entities = [{type:'EVENT', text: 'event X'}, {type:'ORG', text:'org Y'}]
  return {sentiment, keywords, entities}
}

export function batchAnalyze(texts){
  return texts.map(t=>({id:t.id, result: analyzeTextSemantic(t.text)}))
}
