from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class RequirementsRequest(BaseModel):
    game: str

@app.post('/requirements')
def systemRequirements(game:RequirementsRequest):
    if game.game == 'Dragon\'s Dogma 2':
        return {'requirements': "dd2 requirements"}
    else:
        return {'requirements': 'requirements not found'}

   