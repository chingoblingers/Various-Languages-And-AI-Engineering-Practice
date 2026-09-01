from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()
class  DiagnosticRequest(BaseModel):
    message: str
@app.post('/diagnostics')
async def runDiagnostics(request:DiagnosticRequest):
    message = request.message.lower()
    if "econnrefused" in message:
        return {"diagnostic": "This could be a connection error due to..."}
    elif 'timeout' in message:
        return {"diagnostic": "This could be a issue with the server due to..."}
    else:
        return {"diagnostic": "Unable to identify a known diagnostic pattern."}
    
