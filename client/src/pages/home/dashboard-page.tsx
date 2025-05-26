import { NavLink } from "react-router-dom"

import ListComponent from "@/components/shared/list-component"
import clientPaths from "@/configs/paths/client.paths.config"
import useProjects from "@/hooks/home/use-project"

const DashboardPage = () => {

    const { isLoading, projects } = useProjects()

    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-red-500 ">
            {isLoading ? (
                <span>loading</span>
            ) : (
                <ListComponent
                    data={projects as TProjects[]}
                    as='ul'
                    className=" list-none p-0 m-0 "
                    renderItem={(project) => (
                        <li key={project.id}>
                            <NavLink className="flex flex-col gap-2" to={clientPaths.home.project.replace(":id", project.id)}>
                                <span>{project.id}</span>
                                <span>{project.name}</span>
                                <span>{project.description}</span>
                            </NavLink>
                        </li>
                    )}

                    empty={
                        <div>
                            <span>No Project Available.</span>
                        </div>
                    }
                />
            )}
        </div>
    )
}

export default DashboardPage