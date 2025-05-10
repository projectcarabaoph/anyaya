import * as z from 'zod'

const pathsSchema = z.string().min(1)

const schema = z.object({
    marketing: z.object({
        landing: pathsSchema
    })
})


const clientPaths = schema.parse({
    marketing: {
        landing: "/"
    }
} satisfies z.infer<typeof schema>)

export default clientPaths