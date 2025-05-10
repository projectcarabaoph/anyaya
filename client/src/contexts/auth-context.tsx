import { createContext, useEffect } from "react"
import { Outlet } from 'react-router-dom'
import { toast } from "sonner"

import { refreshToken } from "@api/auth"
import useRefreshToken from "@hooks/auth/use-refresh-token"


export type TAuthContext = {
    accessToken: string,
    setAccessToken: React.Dispatch<React.SetStateAction<string>>;
}


export type TAuthProvider = {
    children: React.ReactNode
}


const AuthContext = createContext<TAuthContext | undefined>(undefined)


export function AuthProvider({ children }: TAuthProvider) {

    const { accessToken, setAccessToken, isLoading, setIsLoading } = useRefreshToken()


    useEffect(() => {

        const verifyRefreshToken = async () => {
            try {
                const response = await refreshToken()
                setAccessToken(response?.accessToken)
            } catch (error) {
                if (error instanceof Error) toast.error(error.message)
            } finally {
                setIsLoading(false)
            }
        }

        if (!accessToken) {
            verifyRefreshToken()
        } else {
            setIsLoading(false)
        }
    }, [accessToken, setAccessToken, setIsLoading])

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            {isLoading ? <span>Loading...</span>
                : <>
                    {children}
                    <Outlet />
                </>
            }
        </AuthContext.Provider>
    )
}

export default AuthContext