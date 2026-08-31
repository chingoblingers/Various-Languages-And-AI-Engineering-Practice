import {z} from 'zod'
type Route = "direct" | "knowledge_base" | "web";

const routingSchema = z.object({
    "route" : z.enum(['direct', "knowledge_base", "web"]).describe(
        `Use the direct route when you can answer the users question with your current knowledge.
        Use the knowledge_base route when you need to check for company policies or information for the user
        Use the web route for current day information or when the user asks for non company info that requires knowledge
        you do not have currently.`
    ),
    "reason": z.string().describe(`I need info on company policies - Used knowledge_base route
        I need info on some similar places iin the area - Used web search
        Are you an AI - used direct route.`)
})

type RoutingDecision = z.infer<typeof routingSchema>

const aiResponse = await generateObject({
    model : 'ai-model',
    schema: routingSchema,
    prompt: `You awnser the users question in detail and ask for follow ups. 
    Before answering detirmine what schema route the question falls under and if more information and tools are needed. `
})