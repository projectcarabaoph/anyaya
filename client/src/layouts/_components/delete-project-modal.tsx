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

export default function DeleteProjectModal() {
    const { isOpen, onClose, type } = useProjectModal();
    const isModalOpen = isOpen && type === "deleteProjectModal";

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

                <div>
                    <Input />
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
                        type="button"
                        variant="destructive"
                        className="w-full sm:w-auto"
                    // onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}
