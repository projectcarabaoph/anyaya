import { NavLink } from "react-router-dom"

import ListComponent from "@/components/shared/list-component"
import clientPaths from "@/configs/paths/client.paths.config"

import useProjects from "@/hooks/home/use-project"

const ProjectDashboardPage = () => {

    const { isLoading, projects } = useProjects()


    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-red-500 ">
            <NavLink to={clientPaths.home.project.new} className="bg-white rounded-md p-2">Create Project</NavLink>

            {isLoading ? (
                <span>loading</span>
            ) : (
                <ListComponent
                    data={projects as TProjects[]}
                    as='ul'
                    className=" list-none p-0 m-0 "
                    renderItem={(project) => (
                        <li key={project.id}>
                            <NavLink className="flex flex-col gap-2" to={clientPaths.home.project.id.replace(":id", project.id)}>
                                <span>{project.id}</span>
                                <span>{project.name}</span>
                                <span>{project.description}</span>
                            </NavLink>
                        </li>
                    )}

                    empty={
                        <div className="flex flex-col gap-2">
                            <span>No Project Available.</span>
                        </div>
                    }
                />
            )}
        </div>
    )
}

export default ProjectDashboardPage