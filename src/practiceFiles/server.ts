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

server.tool(
    'searchKnownIssue',
    'search the knowledge base for the requested item',
    {"issue": z.string().describe('string from the user used to search the knowledge base')},
    async({issue}) =>{
        return {
            content: [
                {
                    "type": 'text',
                    "text": issue
                    
                }
            ]
        }
    }
)