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
        dashboard: pathsSchema,
        project: pathsSchema,
        project_settings: pathsSchema,
        project_new: pathsSchema

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
        dashboard: "/home",
        project: '/home/:id',
        project_settings: '/home/:id/settings',
        project_new: '/home/new'
    }
} satisfies z.infer<typeof schema>)

export default clientPaths