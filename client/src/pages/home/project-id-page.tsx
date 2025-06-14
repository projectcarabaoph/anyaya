import { format } from 'date-fns'

import ListComponent from "@/components/shared/list-component";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import useProjectById from "@/hooks/home/use-project-by-id";
import avatarInitials from "@/utils/avatar-initials";
import { useProjectModal } from '@/hooks/home/use-project-modal';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import clientPaths from '@/configs/paths/client.paths.config';

const ProjectIdPage = () => {

    const { isLoading, project } = useProjectById()
    const { onOpen } = useProjectModal()

    const formatDate = project?.created_at ? format(new Date(project?.created_at as string), 'MMM dd yyyy') : ""

    return (
        <div className="h-full w-full flex flex-col gap-2 bg-orange-200 p-2">
            {isLoading ? (
                <span>loading</span>
            ) : (
                <div className="flex flex-col gap-2">
                    <div className='flex flex-row gap-2 justify-between'>
                        <div className="flex flex-col gap-2">
                            <span>{project?.name}</span>
                            <span>{project?.description}</span>
                            <span>{formatDate}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <NavLink className='bg-slate-300 text-center h-9 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-neutral-300' to={clientPaths.home.project.settings.replace(":id", project?.id as string)}>
                                Update
                            </NavLink>
                            <Button onClick={() => onOpen('deleteProjectModal', project as IProjectDetailWithMembership)} variant='destructive'>
                                Delete Project
                            </Button>
                        </div>
                    </div>
                    <ListComponent
                        data={project?.project_memberships as TProjectMembershipProfile[]}
                        as="ul"
                        renderItem={(member) => (
                            <li className="flex flex-row gap-2 border border-black p-2" key={member.added_at}>
                                <Avatar title={`${member.profiles?.avatar_url}'s avatar`}>
                                    <AvatarImage
                                        src={member?.profiles?.avatar_url as string}
                                        alt={`${member?.profiles?.full_name}'s avatar`}
                                    />
                                    <AvatarFallback>{avatarInitials(member?.profiles?.full_name)}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="font-medium">{member?.profiles?.full_name}</span>
                                    <span>{member?.role}</span>
                                </div>
                            </li>
                        )}
                    >
                    </ListComponent>
                </div>
            )}
        </div>
    )
}

export default ProjectIdPage