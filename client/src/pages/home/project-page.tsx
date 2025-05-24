
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { getProjectById } from "@/api/home/project";
import useAuth from "@/hooks/auth/use-auth";
import ListComponent from "@/components/shared/list-component";

const ProjectPage = () => {

    const [project, setProject] = useState<IProjectDetails | null>(null)

    const { id } = useParams<TParams>();
    const { accessToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            navigate("*");
            return;
        }

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchProjectById = async () => {
            try {
                const response = await getProjectById(id, accessToken, signal);
                setProject(response)
            } catch (error) {
                if (error instanceof Error && error.name === "AbortError") return; // silently ignore
                if (error instanceof Error) toast.error(error.message);
            }
        };

        fetchProjectById();

        return () => controller.abort();
    }, [id, accessToken, navigate]);

    return (
        <div className="h-full w-full flex flex-col gap-2 bg-orange-200">
            <div className="flex flex-col gap-2">
                <span>{project?.name}</span>
                <span>{project?.description}</span>
                <span>{project?.created_at}</span>
                <ListComponent
                    data={project?.project_memberships as TProjectMembership[]}
                    as="ul"
                    renderItem={(member) => (
                        <li className="flex flex-col gap-2" key={member.added_at}>
                            <span>{member?.profile_id}</span>
                            <span>{member?.profile_id}</span>
                            <span>{member?.role}</span>
                        </li>
                    )}
                >

                </ListComponent>
            </div>
        </div>
    )
}

export default ProjectPage