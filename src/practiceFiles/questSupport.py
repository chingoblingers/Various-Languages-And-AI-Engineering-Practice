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


