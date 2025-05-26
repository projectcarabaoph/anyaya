
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { format } from 'date-fns'
import { Button } from "@/components/ui/button"

import { singOutUser } from "@/api/auth"
import useAuth from "@/hooks/auth/use-auth"
import { useProjectModal } from "@/hooks/home/use-project-modal"
import { createProject, getAllProjects } from "@/api/home/project"


const DashboardPage = () => {

    const [projectList, setProjects] = useState<TProjects[]>([])
    const [projectById, setProjectById] = useState<IProjectDetails | null>(null)
    const { accessToken, setAccessToken } = useAuth()
    const { onOpen } = useProjectModal()

    console.log(projects)

    const fetAllProjects = useCallback(async () => {
        try {
            const response = await getAllProjects(accessToken)
            console.log(response)
        } catch (error) {
            if (error instanceof Error) toast.error(error.message)
        }
    }, [accessToken])


    useEffect(() => {
        fetAllProjects()
    }, [fetAllProjects])

    return (
        <div className="flex flex-col gap-2 items-center justify-center w-full min-dvh h-full bg-slate-500 ">
            <Button onClick={() => handleSignOut(accessToken)} >
                Sign Out
            </Button>

            <form
                className="min-h-96"
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    createProject(formData, accessToken);
                }}
            >
                <input type="text" name="name" defaultValue="project" />
                <input type="text" name="description" defaultValue="project desc" />
                <button type="submit">Submit</button>
            </form>

            {projectList.length === 0 ? (
                <p>No projectList found.</p>
            ) : (
                <ul className="flex flex-col gap-2 min-h-52 ">
                    {projectList?.map(project => (
                        <li className="flex flex-col gap-2 border border-white rounded-md p-2" key={project?.id}>
                            <Button onClick={() => viewProjectDetails(project?.id)} type="button">View Details</Button>
                            <span>ID: {project?.id}</span>
                            <span>Owner: {project?.owner_id}</span>
                            <span>Name: {project?.name}</span>
                            <span>Description: {project?.description}</span>
                            <span>Created: {format(new Date(project?.created_at), 'MMMM d, yyyy')}</span>
                        </li>
                    ))}
                </ul>
            )}

            {projectById ? (
                <div className="flex flex-col gap-2 min-h-52 border border-white rounded-md p-2">
                    <span>ID: {projectById?.id}</span>
                    <span>Owner: {projectById?.owner_id}</span>
                    <span>Name: {projectById?.name}</span>
                    <span>Description: {projectById?.description}</span>
                    <Button onClick={() => onOpen('deleteProjectModal', projectById)} variant='destructive'>Delete</Button>
                    <ul className="flex flex-col gap-2">
                        <li className="font-bold">members:</li>
                        {projectById?.project_memberships?.map((member) => (
                            <li className="flex flex-col border border-white" key={member.profile_id}>
                                <span>{member.profile_id}</span>
                                <span className="font-bold">{member.role}</span>
                            </li>
                        ))

                        }
                    </ul>
                </div>
            ) : (
                <p>empty...</p>
            )}


        </div>
    )


}


export default DashboardPage