
import { z } from "zod";

export const codeSchema = z.object({
    code: z.string().uuid()
})


export const deleteProjectSchema = (projectName: string) =>
    z.object({
        name: z
            .string()
            .min(1, { message: 'Project Name is required.' })
            .refine((val) => val === projectName, {
                message: 'Project Name does not match.',
            }),
    });

export const createProjectSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Project Name is required.' })
        .superRefine((value, ctx) => {
            if (value.length <= 6) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Project Name must be atleast 6 characters.",
                });
            }
            if (value.length > 40) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Project must be no longer than 40 characters.",
                });
            }
        }),
    description: z
        .string()
        .min(1, { message: 'Description is required.' })
        .superRefine((value, ctx) => {
            if (value.length <= 10) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Description must be atleast 10 characters.",
                });
            }
            if (value.length > 300) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Description must be no longer than 300 characters.",
                });
            }
        }),
}) 