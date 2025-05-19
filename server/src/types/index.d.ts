
type TProfiles = {
    id: string
    email: string
    full_name: string
    avatar_url: string
}

type TProject = {
    id: string,
    name: string,
    description: string,
    owner_id: string,
    created_at: string
}

type TProjectMember = {
    profile_id: string,
    project_id: string,
    role: string,
    added_at: string
}