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