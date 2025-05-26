
import { z } from "zod";

export const codeSchema = z.object({
    code: z.string().uuid()
})


export const deleteProjectSchema = (projectName: string) =>
    z.object({
        name: z
            .string()
            .min(1, 'Project Name is required.')
            .refine((val) => val === projectName, {
                message: 'Project Name does not match.',
            }),
    });

