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

    }),
    home: z.object({
        project: z.object({
            dashboard: pathsSchema,
            id: pathsSchema,
            settings: pathsSchema,
            new: pathsSchema
        })
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

    },
    home: {
        project: {
            dashboard: "/home",
            id: '/home/:id',
            settings: '/home/:id/settings',
            new: '/home/new'
        }
    }
} satisfies z.infer<typeof schema>)

export default clientPaths