
import { Request, Response } from "express";

import { serverClient } from "@/configs/supabase/server-client";
import ApiError from "@/utils/misc/api-error";
import errorHandler from "@/utils/misc/error-handler";
import { createProjectSchema, deleteProjectByIdSchema, getProjectByIdSchema, updateProjectByIdSchema } from "@/utils/schemas";

export const createProject = async (req: Request, res: Response) => {
    try {
        const result = createProjectSchema.safeParse(req.body)

        if (!result.success) throw new ApiError(result.error.errors[0].message, 400);

        const { name, description } = result.data
        const supabase = serverClient(req, res)

        const { data: projectData, error: projectError } = await supabase
            .from('projects')
            .insert({
                name,
                description,
                owner_id: req.user?.id
            })
            .select('*')
            .single<TProjects>()

        if (projectError) throw new ApiError(projectError.message, 400)

        const { data: memberData, error: memberError } = await supabase
            .from('project_memberships')
            .insert({
                profile_id: projectData.owner_id,
                project_id: projectData?.id,
                role: "admin",
            })
            .select('*')
            .single<TProjectMemberships>()

        if (memberError) {
            await supabase
                .from('projects')
                .delete()
                .eq('profile_id', projectData?.owner_id)
                .eq('project_id', projectData?.id)

            throw new ApiError(memberError.message, 400)
        }

        const data = {
            ...projectData,
            ...memberData
        }

        res.status(200).json({ data })
    } catch (error) {
        errorHandler(error, req, res)
        return
    }

}


export const updateProjectById = async (req: Request, res: Response) => {
    try {
        const result = updateProjectByIdSchema.safeParse({
            ...req.params,
            ...req.body
        })

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
        const result = deleteProjectByIdSchema.safeParse(req.params)

        if (!result.success) throw new ApiError(result.error.errors[0].message, 400)

        const supabase = serverClient(req, res)

        const { id } = result.data


        const { data: memberData, error: memberError } = await supabase
            .from('project_memberships')
            .select('*')
            .eq('profile_id', req.user?.id)
            .eq('project_id', id)
            .single<TProjectMemberships>();

        if (memberError || !memberData) throw new ApiError(memberError?.message || 'Membership not found', 400);

        if (memberData.role !== 'admin') throw new ApiError('Forbidden.', 403);


        const { data, error } = await supabase
            .from('projects')
            .update({
                is_deleted: true
            })
            .eq('owner_id', memberData?.profile_id)
            .eq('id', memberData?.project_id)
            .select('*')
            .single();

        if (error) throw new ApiError(error.message, 400)

        res.status(200).json({ data })
    } catch (error) {
        errorHandler(error, req, res)
        return
    }
}


export const getAllProjects = async (req: Request, res: Response) => {

    try {
        const supabase = serverClient(req, res)

        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('owner_id', req.user?.id)
            .eq('is_deleted', false)

        if (error) throw new ApiError(error.message, 400)

        res.status(200).json({ data })

    } catch (error) {
        errorHandler(error, req, res)
        return
    }

}


export const getProjectById = async (req: Request, res: Response) => {
    try {
        const result = getProjectByIdSchema.safeParse(req.params)

        if (!result.success) throw new ApiError(result.error.errors[0].message, 400)

        const supabase = serverClient(req, res)

        const { id } = result.data

        const { data, error } = await supabase
            .from('projects')
            .select('*, project_memberships(*, profiles(*))')
            .eq('id', id)
            .eq('owner_id', req.user?.id)
            .eq('is_deleted', false)
            .single<IProjectDetailWithMembership>()

        if (error) throw new ApiError(error.message, 400)

        res.status(200).json({ data })
    } catch (error) {
        errorHandler(error, req, res)
        return
    }

}