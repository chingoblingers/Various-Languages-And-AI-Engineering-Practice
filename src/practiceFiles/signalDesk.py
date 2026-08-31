from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()
class  DiagnosticRequest(BaseModel):
    message: str
@app.post('/diagnostics')
async def runDiagnostics(request:DiagnosticRequest):
    message = request.message
    return {'diagnostic': message }
