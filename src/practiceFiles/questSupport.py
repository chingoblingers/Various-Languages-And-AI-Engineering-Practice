from fastapi import FastAPI
from pydantic import BaseModel
import math

app = FastAPI()

class SearchRequest(BaseModel):
    query:str

async def embed_query(query:str) -> list[float]:
    response = await client.embeddings.create(
        model: "ai-model",
        input: query
    )
    return response.data[0].embedding

@app.post("/search")
async def search(userRequest: SearchRequest):
   query_vector = await embed_query(userRequest.query)
   best_match = find_closest_vector(query_vector)
   results = [] if best_match is None else [best_match['content']]
   score = None if best_match is None else best_match["score"]
   return {"query": userRequest.query, "results": results, 'score': score}

stored_vectors = [
    {"content": "We are the champions", "embedding": [0.1, 0.2, 0.2]},
    {"content": "Hello World", "embedding": [0.8, 0.7, 0.9]},
    {"content": "Bacon pancakes", "embedding": [0.0, 0.1, 0.2]}
]

def find_closest_vector(query_vector: list[float]) -> dict[str, str | float] | None:
    highest_score = -1.0
    best_content = None
    for document in stored_vectors:
        score = cosine_similarity(query_vector, document['embedding'])
        if score > highest_score:
            highest_score = score
            best_content = document["content"]
    if best_content is None:
        return None
    return {"content": best_content, "score": highest_score}


vector_a = [0.1, 0.2, 0.3]
vector_b = [0.4, 0.5, 0.6]                

def cosine_similarity(vector_a: list[float],vector_b: list[float]) -> float:
    dot_product = 0.0
    squared_total_a = 0.0
    squared_total_b = 0.0
    for a, b in zip(vector_a,vector_b):
        dot_product += a*b
        squared_total_a += a**2
        squared_total_b += b**2
    magnitude_a = math.sqrt(squared_total_a)
    magnitude_b = math.sqrt(squared_total_b)
    if magnitude_a == 0 or magnitude_b == 0:
        return 0.0
    return dot_product / (magnitude_a * magnitude_b)
        