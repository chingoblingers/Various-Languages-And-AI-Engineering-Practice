from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class SearchRequest(BaseModel):
    query:str

def embed_query(query:str) -> list[float]:
    return [0.1, 0.2, 0.3]

@app.post("/search")
def search(userRequest: SearchRequest):
   query_vector = embed_query(userRequest.query)
    return {"query": userRequest.query, "results": []}

stored_vectors = [
    [0.1, 0.2, 0.2],
    [0.8, 0.7, 0.9],
    [0.0, 0.1, 0.2]
]

def find_closest_vector(query_vector: list[float]) -> list[float]:
        return stored_vectors[0]
