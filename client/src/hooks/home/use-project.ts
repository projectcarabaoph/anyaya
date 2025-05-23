import { useEffect, useState } from "react"
import { toast } from "sonner"

import useAuth from "@/hooks/auth/use-auth"
import { getAllProjects } from "@/api/home/project"

const useProjects = () => {

    const [projects, setProjects] = useState<TProjects | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const { accessToken } = useAuth()

    useEffect(() => {
        const fetchAllProjects = async () => {
            try {
                const response = await getAllProjects(accessToken)
                setProjects(response)
            } catch (error) {
                if (error instanceof Error) toast.error(error.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchAllProjects()
    }, [accessToken])


    return { isLoading, projects, setProjects }
}

export default useProjects