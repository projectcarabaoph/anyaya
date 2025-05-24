import { getProjectById } from "@/api/home/project";
import useAuth from "@/hooks/auth/use-auth";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const ProjectPage = () => {
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
                console.log(response)
            } catch (error) {
                if (error instanceof Error && error.name === "AbortError") return; // silently ignore
                if (error instanceof Error) toast.error(error.message);
            }
        };

        fetchProjectById();

        return () => controller.abort();
    }, [id, accessToken, navigate]);

    return (
        <div>
            <span>Projects here</span>
        </div>
    )
}

export default ProjectPage