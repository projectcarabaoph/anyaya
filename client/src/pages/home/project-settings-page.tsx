import ProjectUpdateForm from "@/pages/home/_components/project-update-form"

const ProjectSettingsPage = () => {
    return (
        <div className="h-full w-full bg-purple-500 flex flex-col gap-2 justify-center items-center">
            <h1>Settings</h1>
            <ProjectUpdateForm />
        </div>
    )
}

export default ProjectSettingsPage