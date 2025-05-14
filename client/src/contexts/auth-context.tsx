import { createContext } from "react"
import { Outlet } from 'react-router-dom'

import useRefreshToken from "@hooks/auth/use-refresh-token"


export type TAuthContext = {
    accessToken: string,
    setAccessToken: React.Dispatch<React.SetStateAction<string>>;
}


export type TAuthProvider = {
    children: React.ReactNode
}

const AuthContext = createContext<TAuthContext>({} as TAuthContext)


export function AuthProvider({ children }: TAuthProvider) {

    const { accessToken, setAccessToken, isLoading } = useRefreshToken()

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