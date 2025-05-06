import { z } from 'zod';

export const signInWithEmailSchema = z.object({
    email: z.string().email(),
});