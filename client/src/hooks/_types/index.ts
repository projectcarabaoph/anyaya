export interface IScreenSize {
    width: number;
    height: number;
}

export type TProjectModal =
    "createProjectModal"
    | "deleteProjectModal";

export interface IProjectModalStore {
    type: TProjectModal | null;
    data?: IProjectDetails | IProjectDetailWithMembership;
    isOpen: boolean;
    onOpen: (type: TProjectModal, data?: IProjectDetails | IProjectDetailWithMembership) => void;
    onClose: () => void;
}