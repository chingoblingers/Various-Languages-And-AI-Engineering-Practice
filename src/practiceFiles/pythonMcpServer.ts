import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js'
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js'
import {z} from "zod"

const server = new McpServer({
    name: "game-support-server",
    version: '1.0.0'
})

async function connectedServer(){
const transport = new StdioServerTransport()
await server.connect(transport)
}

connectedServer()

const knownIssues = [
  "game crashes on startup",
  "controller not detected",
  "low fps after update"
]

type RequirementsResponse = {
  requirements: string
}

server.tool(
    'searchKnownIssue',
    'search the knowledge base for the requested item',
    {"issue": z.string().describe('string from the user used to search the knowledge base')},
    async({issue}) =>{
        const loweredUserIssue = issue.toLowerCase()
        const userIssue = knownIssues.find(problem => problem.toLowerCase().includes(loweredUserIssue)  || loweredUserIssue.includes(problem.toLowerCase()) )?? "No match found"
        return {
            content: [
                {
                    "type": 'text',
                    "text": userIssue
                    
                }
            ]
        }
    }
)
server.tool(
    'getSystemRequirements',
    'gets the requirements of the current system',
    {"game": z.string().describe('name of the game the user would like the system requirements for')},
    async({game}) =>{
        try{
        const response =  await fetch('http://127.0.0.1:8000/requirements', {"method": 'POST', "headers": {'Content-Type': 'application/json'}, 'body': JSON.stringify({game})})
        const data: RequirementsResponse = await response.json()
        return {
            content: [
                {
                    "type": 'text',
                    'text': data.requirements
                }
            ]
        }

        }catch(error){
        console.error(error)
        return {
            content : [
                {
                    "type": 'text',
                    'text': "Unable to reach the requirements service"
                }
            ]
        }

        }
        
    }
)