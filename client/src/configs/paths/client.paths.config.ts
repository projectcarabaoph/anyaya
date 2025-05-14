import * as z from 'zod'

const pathsSchema = z.string().min(1)

const schema = z.object({
    marketing: z.object({
        landing: pathsSchema
    }),
    auth: z.object({
        signin: z.object({
            oauth: pathsSchema,
            verify: pathsSchema,
            callback: pathsSchema,
        }),
    })
})


const clientPaths = schema.parse({
    marketing: {
        landing: "/"
    },
    auth: {
        signin: {
            oauth: "/auth/sign-in",
            verify: "/auth/sign-in/verify",
            callback: "/auth/sign-in/callback",
        },
    }
} satisfies z.infer<typeof schema>)

export default clientPaths