import { enumsOauthProvider } from '@utils/enums';
import { z } from 'zod';

export const signInWithEmailSchema = z.object({
    email: z.string().email(),
});


export const signInWithOauthSchema = z.object({
    provider: enumsOauthProvider
        .describe('Supported OAuth providers')
});