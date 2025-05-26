
type TProfiles = {
    id: string
    email: string
    full_name: string
    avatar_url: string
}

type TProjects = {
    id: string
    name: string
    description: string
    owner_id: string
    is_deleted: boolean
    created_at: string
}

type TProjectMemberships = {
    profile_id: string
    project_id: string
    role: string
    added_at: string
}


interface IProjectDetails extends TProjects {
    project_memberships: TProjectMemberships[];
}

type TProjectMembershipProfile = {
    profile: TProfiles
    role: string
    added_at: string
}

interface IProjectDetailWithMembership extends TProjects {
    project_memberships: TProjectMembershipProfile[];
}