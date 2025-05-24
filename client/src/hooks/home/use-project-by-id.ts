import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { getProjectById } from '@/api/home/project';
import useAuth from '@/hooks/auth/use-auth';

const useProjectById = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [project, setProject] = useState<IProjectDetailWithMembership | null>(null)

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
                if (error instanceof Error) toast.error(error.message)
            } finally {
                setIsLoading(false)
            }
        };

        fetchProjectById();

        return () => controller.abort();
    }, [id, accessToken, navigate]);


    return { isLoading, project, setProject }
}

export default useProjectById