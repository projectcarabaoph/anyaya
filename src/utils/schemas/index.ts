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