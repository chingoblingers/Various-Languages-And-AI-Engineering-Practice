from fastapi import FastAPI
from pydantic import BaseModel
import math

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
    return dot_product / (magnitude_a * magnitude_b)
        