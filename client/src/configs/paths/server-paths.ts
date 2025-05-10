import * as z from 'zod'

const pathsSchema = z.string().min(1)

const schema = z.object({
    auth: z.object({
        signin: z.object({
            email: pathsSchema,
            oauth: pathsSchema,
            verify: pathsSchema,
            callback: pathsSchema,
            refresh: pathsSchema
        }),
        signout: z.object({
            user: pathsSchema,
        })
    })
})

const serverPaths = schema.parse({
    auth: {
        signin: {
            email: "/sign-in/email",
            oauth: "/sign-in/oauth",
            verify: "/sign-in/verify",
            callback: "/sign-in/callback",
            refresh: "/sign-in/refresh"
        },
        signout: {
            user: "/sign-out"
        }
    }
} satisfies z.infer<typeof schema>)

export default serverPaths

