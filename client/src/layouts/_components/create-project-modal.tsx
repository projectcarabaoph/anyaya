import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogHeader,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { createProjectSchema } from '@/utils/_schemas';
import clientPaths from '@/configs/paths/client.paths.config';

import { useProjectModal } from "@/hooks/home/use-project-modal";
// import useAuth from '@/hooks/auth/use-auth';

import type { TCreateProjectSchema } from '@/utils/_types';

export default function CreateProjectModal() {

    const { isOpen, onClose, type } = useProjectModal();
    // const { accessToken } = useAuth()
    const navigate = useNavigate()

    const isModalOpen = isOpen && type === "createProjectModal";

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

            console.log(formData)
            // onClose()
            // navigate(clientPaths.home.dashboard)
        } catch (error) {
            if (error instanceof Error) toast.error(error.message)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
            <DialogContent
                aria-describedby={undefined}
                className="bg-white w-full max-w-[calc(100%-.5rem)] sm:max-w-md flex h-auto rounded-md  px-2 sm:px-4 lg:px-6 mx-auto   flex-col justify-items-center gap-6 text-black dark:text-white"
            >
                <DialogHeader className="pr-4 m-0 w-full">
                    <DialogTitle className="pr-4 m-0 text-left text-lg">
                        Create Project
                    </DialogTitle>
                    <DialogDescription className="text-left">
                        Fill in the details below to create a new project.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="name">Project Name</label>
                        <Input  {...register('name')} />
                        {errors.name && (
                            <span className="text-sm text-red-500">{errors.name.message}</span>
                        )}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="description">Description</label>
                        <textarea  {...register('description')} />
                        {errors.description && (
                            <span className="text-sm text-red-500">{errors.description.message}</span>
                        )}
                    </div>
                    <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                        <Button
                            type="button"
                            variant="secondary"
                            className="w-full sm:w-auto"
                            onClick={onClose}
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

                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
