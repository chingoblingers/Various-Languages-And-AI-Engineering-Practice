from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class SearchRequest(BaseModel):
    query:str

@app.post("/search")
def search(userRequest: SearchRequest):
    return {"query": userRequest.query, "results": []}

def embed_query(query:str):
    return [0.1, 0.2, 0.3]

