import {z} from 'zod'
import {generateText, Output} from 'ai'

const supportRoutingSchema = z.object({
    route: z.enum(["direct", 'knowledge_base', 'diagnostics', 'web']).describe(`Use direct when you can answer with your current knowledge.
        Use knowledge_base when you need to check the company database. Use diagnostics when the users code or data needs to be checked for errors.
        Use web when you need to search for data online for your solution`),
    reason: z.string().describe(`Provide a description of why the route was chosen as the best fit for the users issue`),
    urgency: z.enum(['low', "medium", 'high']).describe(`Use low when the user is only looking for troubleshooting.
        Use medium when user seems frustrated or has account issues. Use high when the user demands to speak to a human or customer support`)
})

type RoutingSchema = z.infer<typeof supportRoutingSchema>
const userMessage: string = "My Node server keeps throwing ECONNREFUSED when it tries to connect to Postgres"

try{
const {output} = await generateText({
    model: 'ai-model',
    output: Output.object({
        schema: supportRoutingSchema
    }),
    prompt: `Categorize the users question according to the schema. user question: ${userMessage}`
})
let context: string = ""
async function runDiagnostics(msg:string):Promise<string>{
    const response = await fetch("http://127.0.0.1:8000/diagnostics", {method:'POST', headers:{'Content-Type': 'application/json'}, "body":JSON.stringify({"message": msg})})
    if(!response.ok){
        throw new Error(`Diagnostics request failed: ${response.status}`)
    }
    const data = await response.json()
    return data.diagnostic
}
switch(output.route){
    case "direct":
        break
    case "knowledge_base":
        context = await searchKnowledgeBase(userMessage)
        break
    case 'web':
        context = await searchWeb(userMessage)
        break
    case 'diagnostics':
        context = await runDiagnostics(userMessage)
}

}catch(error){
    console.error(error)
    res.status(500).json({message: 'unable to process request'})
}

