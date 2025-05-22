import { useEffect, useState } from "react"
import { toast } from "sonner"

import useAuth from "@/hooks/auth/use-auth"
import { getProfile } from "@/api/home/profile"
import type { TProfiles } from "@/hooks/_types"

const useProfile = () => {

    const [profile, setProfile] = useState<TProfiles | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const { accessToken } = useAuth()

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile(accessToken)
                setProfile(response)
            } catch (error) {
                if (error instanceof Error) toast.error(error.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchProfile()
    }, [accessToken])


    return { isLoading, profile, setProfile }
}

export default useProfile