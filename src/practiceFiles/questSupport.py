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
   closest_vector = find_closest_vector(query_vector)
   results = [] if closest_content is None else [closest_content]
    return {"query": userRequest.query, "results": closest_content}

stored_vectors = [
    {"content": "We are the champions", "embedding": [0.1, 0.2, 0.2]},
    {"content": "Hello World", "embedding": [0.8, 0.7, 0.9]},
    {"content": "Bacon pancakes", "embedding": [0.0, 0.1, 0.2]}
]

def find_closest_vector(query_vector: list[float]) -> str|None:
        for document in stored_vectors:
            if query_vector == document['embedding']:
                return document["content"]
