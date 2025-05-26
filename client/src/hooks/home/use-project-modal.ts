import { create } from "zustand";
import type { IProjectModalStore, TProjectModal } from "@/hooks/_types";

export const useProjectModal = create<IProjectModalStore>((set) => ({
    type: null,
    isOpen: false,
    onOpen: (type: TProjectModal, data?: IProjectDetails | IProjectDetailWithMembership) =>
        set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false }),
}));