import * as z from 'zod'

const pathsSchema = z.string().min(1)

const schema = z.object({
    marketing: z.object({
        landing: pathsSchema
    }),
    auth: z.object({
        signin: pathsSchema,
        verify: pathsSchema,
        callback: pathsSchema

    })
})

const clientPaths = schema.parse({
    marketing: {
        landing: "/"
    },
    auth: {
        signin: "/auth/sign-in",
        verify: "/auth/verify",
        callback: "/auth/callback",

    }
} satisfies z.infer<typeof schema>)

export default clientPaths