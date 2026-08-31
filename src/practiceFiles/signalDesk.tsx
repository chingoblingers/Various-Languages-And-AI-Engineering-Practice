import {z} from 'zod'

const supportRoutingSchema = z.object({
    route: z.enum(["direct", 'knowledge_base', 'diagnostics', 'web']).describe(`Use direct when you can answer with your current knowledge.
        Use knowledge_base when you need to check the company database. Use diagnostics when the users code or data needs to be checked for errors.
        Use web when you need to search for data online for your solution`),
    reason: z.string().describe(`Provide a description of why the route was chosen as the best fit for the users issue`),
    urgency: z.enum(['low', "medium", 'high']).describe(`Use low when the user is only looking for troubleshooting.
        Use medium when user seems frustrated or has account issues. Use high when the user demands to speak to a human or customer support`)
})

type RoutingSchema = z.infer<typeof supportRoutingSchema>