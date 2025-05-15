import { useContext } from "react"

import AuthContext from "@/contexts/auth-context"

const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) console.error('auth hook should be used inside context provider')
    return context
}

export default useAuth