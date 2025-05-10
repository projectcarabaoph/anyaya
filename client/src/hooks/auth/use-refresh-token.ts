import { refreshToken } from "@api/auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";


const useRefreshToken = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [accessToken, setAccessToken] = useState<string>("")

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                const response = await refreshToken()
                setAccessToken(response?.accessToken)
            } catch (error) {
                if (error instanceof Error) toast.error(error.message || 'Refresh token failed.');
            } finally {
                setIsLoading(false)
            }
        }
        if (!accessToken) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }
    }, [accessToken])


    return { isLoading, accessToken, setAccessToken }
}

export default useRefreshToken