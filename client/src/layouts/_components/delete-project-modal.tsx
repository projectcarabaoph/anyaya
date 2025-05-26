import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
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



import { useProjectModal } from "@/hooks/home/use-project-modal";
import type { TDeleteProjectSchema } from '@/utils/_types';
import { deleteProjectById } from '@/api/home/project';
import useAuth from '@/hooks/auth/use-auth';
import { toast } from 'sonner';
import { deleteProjectSchema } from '@/utils/_schemas';
import useUserProfile from '@/hooks/home/use-user-profile';

export default function DeleteProjectModal() {

    const { isOpen, onClose, type, data } = useProjectModal();
    const { accessToken } = useAuth()
    const profile = useUserProfile()

    const isModalOpen = isOpen && type === "deleteProjectModal";


    const {
        register,
        handleSubmit,
        formState: { isLoading, isDirty, isValid, errors }
    } = useForm<TDeleteProjectSchema>({
        resolver: zodResolver(deleteProjectSchema(data?.name as string)),
        mode: 'all'
    })

    const onSubmit = async () => {
        try {
            if (data?.owner_id !== profile.id) throw new Error('Forbidden.')

            const response = await deleteProjectById(data?.id as string, accessToken)
            console.log(response)
            onClose()
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
                        Are you sure you want to delete this project?
                    </DialogTitle>
                    <DialogDescription className="text-left">
                        This will delete the project from the list. You cannot restore a
                        deleted project.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    <p className="text-wrap">Please type <strong>{data?.name}</strong> to delete.</p>
                    <Input  {...register('name')} />
                    {errors.name && (
                        <span className="text-sm text-red-500">{errors.name.message}</span>
                    )}


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
                            variant="destructive"
                            className="w-full sm:w-auto"
                        >
                            Delete
                        </Button>

                    </DialogFooter>
                </form>



            </DialogContent>
        </Dialog>
    )
}
