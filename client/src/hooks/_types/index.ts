export interface IScreenSize {
    width: number;
    height: number;
}

export type TProjectModal = "deleteProjectModal";

export interface IProjectModalStore {
    type: TProjectModal | null;
    data?: TProfiles;
    isOpen: boolean;
    onOpen: (type: TProjectModal, data?: TProfiles) => void;
    onClose: () => void;
}