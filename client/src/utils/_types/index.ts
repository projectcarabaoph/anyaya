import * as z from 'zod'

import type {
    createProjectSchema,
    deleteProjectSchema
} from "@/utils/_schemas";

export type TMarketingLayoutNavLinks = {
    id: number,
    name: string,
    path: string
}

export type TDeleteProjectSchema = z.infer<ReturnType<typeof deleteProjectSchema>>;

export type TCreateProjectSchema = z.infer<typeof createProjectSchema>;
