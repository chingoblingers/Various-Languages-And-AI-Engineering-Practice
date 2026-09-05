from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class RequirementsRequest(BaseModel):
    game: str
