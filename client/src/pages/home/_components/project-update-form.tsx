import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';

import { createProjectSchema } from '@/utils/_schemas';
import clientPaths from '@/configs/paths/client.paths.config';

import useAuth from '@/hooks/auth/use-auth';

import { updateProjectById } from '@/api/home/project';
import useProjectById from '@/hooks/home/use-project-by-id';

import type { TCreateProjectSchema } from '@/utils/_types';

export default function ProjectUpdateForm() {

    const { accessToken } = useAuth()
    const navigate = useNavigate()
    const { isLoading: isProjectLoading, project } = useProjectById()

    const {
        register,
        handleSubmit,
        reset,
        formState: { isLoading, isDirty, isValid, errors }
    } = useForm<TCreateProjectSchema>({
        resolver: zodResolver(createProjectSchema),
        mode: 'all'
    })

    const onSubmit = async (formData: TCreateProjectSchema) => {

        try {

            const id = project?.id as string
            const newFormData = {
                id,
                accessToken,
                ...formData,
            }

            await updateProjectById(newFormData)
            navigate(clientPaths.home.project.dashboard)
        } catch (error) {
            if (error instanceof Error) toast.error(error.message)
        }
    }

    const goBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        reset({
            name: project?.name,
            description: project?.description
        })
    }, [project, reset])

    return isProjectLoading ? (
        <div>Loading..</div>
    ) : (

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white flex flex-col gap-2 w-full max-w-md p-2 rounded-md">
            <div className='flex flex-col gap-1'>
                <h2>Update Project Details</h2>
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="name">Project Name</label>
                <Input  {...register('name')} />
                {errors.name && (
                    <span className="text-sm text-red-500">{errors.name.message}</span>
                )}
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="description">Description</label>
                <Textarea  {...register('description')} />
                {errors.description && (
                    <span className="text-sm text-red-500">{errors.description.message}</span>
                )}
            </div>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button
                    onClick={goBack}
                    type="button"
                    variant="link"
                    className="w-full sm:w-auto"
                >
                    Cancel
                </Button>

                <Button
                    disabled={isLoading || !isDirty || !isValid}
                    type="submit"
                    variant="default"
                    className="w-full sm:w-auto"
                >
                    Save
                </Button>
            </div>
        </form>
    )
}
