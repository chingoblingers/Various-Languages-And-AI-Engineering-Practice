
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
