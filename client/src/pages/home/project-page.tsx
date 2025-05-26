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

const ProjectPage = () => {

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
                            <span>Settings</span>
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
                                <Avatar title={`${member.profiles?.full_name}'s avatar`}>
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

export default ProjectPage