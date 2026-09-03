import {generateText} from ai 

type SearchResponse = {
    query: string
    results: string[]
    score: number | null
}

async function  searchKnowledgeBase(query: string){
  const response = await fetch('python_server_url/search', {"method": "POST", "headers": {"Content-Type": "application/json"}, "body": JSON.stringify({query})})
  const data : SearchResponse = await response.json()
  return data
}


let context = ""

const { results } = searchKnowledgeBase(query)

for (const result of results) {
    context += result
}

const response =  await generateText({
    model: 'ai-model',
    prompt: `Answer the users question using any provided context. If no context is provided answer with your current knowledge.
    question:${query}. context:${context} `
})
