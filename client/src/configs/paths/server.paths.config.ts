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
            email: "/api/auth/sign-in/email",
            oauth: "/api/auth/sign-in/oauth",
            verify: "/api/auth/sign-in/verify",
            callback: "/api/auth/sign-in/callback",
            refresh: "/api/auth/sign-in/refresh"
        },
        signout: {
            user: "/api/auth/sign-out"
        }
    }
} satisfies z.infer<typeof schema>)

export default serverPaths

