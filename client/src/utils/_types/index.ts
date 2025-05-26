import * as z from 'zod'

import type { deleteProjectSchema } from "@/utils/_schemas";
export type TMarketingLayoutNavLinks = {
    id: number,
    name: string,
    path: string
}

export type TDeleteProjectSchema = z.infer<ReturnType<typeof deleteProjectSchema>>;
