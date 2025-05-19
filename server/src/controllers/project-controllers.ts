
import { Request, Response } from "express";

import { serverClient } from "@configs/supabase/server-client";
import ApiError from "@utils/misc/api-error";
import errorHandler from "@utils/misc/error-handler";
import { createProjectSchema, deleteProjectByIdSchema, updateProjectByIdSchema } from "@utils/schemas";

export const createProject = async (req: Request, res: Response) => {
    try {
        const result = createProjectSchema.safeParse(req.body)

        if (!result.success) throw new ApiError(result.error.errors[0].message, 400);

        const supabase = serverClient(req, res)

        const { data, error } = await supabase
            .from('projects')
            .insert(result.data)
            .select('*')
            .single()

        if (error) throw new ApiError(error.message, 400)

        res.status(200).json({ data })
    } catch (error) {
        errorHandler(error, req, res)
        return
    }

}


export const updateProjectById = async (req: Request, res: Response) => {
    try {
        const result = updateProjectByIdSchema.safeParse(req.body)

        if (!result.success) throw new ApiError(result.error.errors[0].message, 400)

        const supabase = serverClient(req, res)

        const { name, description, id } = result.data

        const { data, error } = await supabase
            .from('projects')
            .update({
                name,
                description,
            })
            .eq('owner_id', req.user?.id)
            .eq('id', id)
            .select('*')
            .single()

        if (error) throw new ApiError(error.message, 400)

        res.status(200).json({ data })
    } catch (error) {
        errorHandler(error, req, res)
        return
    }
}


export const deleteProjectById = async (req: Request, res: Response) => {
    try {
        const result = deleteProjectByIdSchema.safeParse(req.body)

        if (!result.success) throw new ApiError(result.error.errors[0].message, 400)

        const supabase = serverClient(req, res)

        const { id } = result.data

        const { data, error } = await supabase
            .from('projects')
            .update({
                is_deleted: true
            })
            .eq('owner_id', req.user?.id)
            .eq('id', id)


        if (error) throw new ApiError(error.message, 400)

        res.status(200).json({ data })
    } catch (error) {
        errorHandler(error, req, res)
        return
    }
}


