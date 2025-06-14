import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';

import { createProjectSchema } from '@/utils/_schemas';
import clientPaths from '@/configs/paths/client.paths.config';

import useAuth from '@/hooks/auth/use-auth';

import type { TCreateProjectSchema } from '@/utils/_types';
import { createProject } from '@/api/home/project';

export default function ProjectNewForm() {

    const { accessToken } = useAuth()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { isLoading, isDirty, isValid, errors }
    } = useForm<TCreateProjectSchema>({
        resolver: zodResolver(createProjectSchema),
        mode: 'all'
    })

    const onSubmit = async (formData: TCreateProjectSchema) => {
        try {
            await createProject(formData, accessToken)
            navigate(clientPaths.home.project.dashboard)
        } catch (error) {
            if (error instanceof Error) toast.error(error.message)
        }
    }

    const goBack = () => {
        navigate(-1)
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white flex flex-col gap-2 w-full max-w-md p-2 rounded-md">
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
            <div className="flex  items-center justify-center flex-col-reverse gap-2 sm:flex-row sm:justify-end">
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
                    Create
                </Button>

            </div>
        </form >
    )
}
