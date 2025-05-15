import { Navigate, Outlet, useLocation } from "react-router-dom"

import clientPaths from "@/configs/paths/client.paths.config"
import useAuth from "@/hooks/auth/use-auth"

const PublicRoutes = () => {
    const { accessToken } = useAuth()
    const location = useLocation()

    return accessToken ? <Navigate to={clientPaths.home.dashboard} state={{ from: location }} replace /> : <Outlet />

}

export default PublicRoutes