import { enumsOauthProvider } from '@/utils/enums';
import { z } from 'zod';

export const signInWithEmailSchema = z.object({
    email: z.string().email(),
});


export const signInWithOauthSchema = z.object({
    provider: enumsOauthProvider
        .describe('Supported OAuth providers')
});

export const verifyOtpTokenSchema = z.object({
    email: z.string().email(),
    token: z.string().length(6),
});

export const callbackTokenSchema = z.object({
    code: z.string().uuid(),
});


export const createProjectSchema = z.object({
    name: z
        .string({
            required_error: "Name is a required field.",
        })
        .min(6, { message: "Name must be at least 6 characters." })
        .max(20, { message: "Name must be less than 20 characters." })
        .trim(),
    description: z
        .string({
            required_error: "Description is a required field.",
        })
        .min(10, { message: "Description must be at least 10 characters." })
        .max(200, { message: "Description must be less than 200 characters." })
        .trim()
})


export const updateProjectByIdSchema = z.object({
    name: z
        .string({
            required_error: "Name is a required field.",
        })
        .min(6, { message: "Name must be at least 6 characters." })
        .max(20, { message: "Name must be less than 20 characters." })
        .trim(),
    description: z
        .string({
            required_error: "Description is a required field.",
        })
        .min(10, { message: "Description must be at least 10 characters." })
        .max(200, { message: "Description must be less than 200 characters." })
        .trim(),
    id: z
        .union([
            z.string().uuid({ message: "Invalid ID" }),
            z.string().min(1, { message: "ID is a required field." })
        ])
})

export const deleteProjectByIdSchema = z.object({
    id: z
        .union([
            z.string().uuid({ message: "Invalid ID" }),
            z.string().min(1, { message: "ID is a required field." })
        ])
})


export const getProjectByIdSchema = z.object({
    id: z
        .union([
            z.string().uuid({ message: "Invalid ID" }),
            z.string().min(1, { message: "ID is a required field." })
        ])
})