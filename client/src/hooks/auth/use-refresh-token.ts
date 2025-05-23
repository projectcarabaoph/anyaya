import { useEffect, useState } from "react";
import { toast } from "sonner";

import { refreshToken } from "@/api/auth";

const useRefreshToken = () => {
    const [accessToken, setAccessToken] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                const response = await refreshToken();
                setAccessToken(response?.accessToken);
            } catch (error) {
                if (error instanceof Error) toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        verifyRefreshToken()
    }, [])

    return { accessToken, setAccessToken, isLoading, setIsLoading };
};

export default useRefreshToken;
