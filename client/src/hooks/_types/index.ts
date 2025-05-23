export interface IScreenSize {
    width: number;
    height: number;
}

export type TProjectModal = "deleteProjectModal";

export interface IProjectModalStore {
    type: TProjectModal | null;
    data?: IProjectDetails;
    isOpen: boolean;
    onOpen: (type: TProjectModal, data?: IProjectDetails) => void;
    onClose: () => void;
}