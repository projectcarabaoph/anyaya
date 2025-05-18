import { enumsOauthProvider } from '@utils/enums';
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
})