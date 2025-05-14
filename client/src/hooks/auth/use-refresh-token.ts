import { refreshToken } from "@api/auth";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const useRefreshToken = () => {
    const [accessToken, setAccessToken] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const postVerifyRefreshToken = useCallback(async () => {
        try {
            const response = await refreshToken();
            setAccessToken(response?.accessToken);
        } catch (error) {
            if (error instanceof Error) toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        postVerifyRefreshToken();
    }, [postVerifyRefreshToken]);

    return { accessToken, setAccessToken, isLoading, setIsLoading };
};

export default useRefreshToken;
