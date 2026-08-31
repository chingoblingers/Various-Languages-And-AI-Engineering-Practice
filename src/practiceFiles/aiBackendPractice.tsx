import {z} from 'zod'

const routingSchema = z.object({
    "route" : z.enum(['direct', "knowledge_base", "web"]).describe(
        `Use the direct route when you can answer the users question with your current knowledge.
        Use the knowledge_base route when you need to check for company policies or information for the user
        Use the web route for current day information or when the user asks for non company info that requires knowledge
        you do not have currently.`
    ),
    "reason": z.string().describe(`Describe the reason why the determined route fits best.`)
})

type RoutingDecision = z.infer<typeof routingSchema>

let userMsg = 'how do i fix my computers fans making too much noise'

let context: string = ""

try{

const aiQuestion = await generateObject({
    model : 'ai-model',
    schema: routingSchema,
    prompt: `Decide what is the best route to answer the users following user question ${userMsg}`
})

const answer = aiQuestion.object

if (answer.route === "direct"){
const directUserResponse = await generateText({
    model: 'ai-model',
    prompt: `answer users question ${userMsg}`
})
return directUserResponse.text

}else if(answer.route === 'knowledge_base'){
 context = await searchKnowledgeBase(userMsg)
}else{
 context = await searchWeb(userMsg)
}

const aiUserResponse = await generateText({
model: "ai-model",
prompt: `Answer the user's question using the context and Question provided. Context:${context}, Question:${userMsg}`
})

return aiUserResponse.text


}catch(error){
    console.error(error)
   return res.status(500).json({message: "unable to process request"})
}