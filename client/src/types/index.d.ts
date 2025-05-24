type TProfiles = {
    id: string
    email: string
    full_name: string
    avatar_url: string
}

type TProjects = {
    created_at: string
    description: string
    id: string
    is_deleted: boolean
    name: string
    owner_id: string
}

type TProjectMembership = {
    added_at: string
    profile_id: string
    project_id: string
    role: string
}

interface IProjectDetails extends TProjects {
    project_memberships: TProjectMembership[];
}

type TParams = {
    id: string
}