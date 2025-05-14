import clientPaths from "@configs/paths/client.paths.config"
import useAuth from "@hooks/auth/use-auth"
import { Navigate, Outlet, useLocation } from "react-router-dom"

const PrivateRoutes = () => {
    const { accessToken } = useAuth()
    const location = useLocation()

    return accessToken ? <Outlet /> : <Navigate to={clientPaths.auth.signin} state={{ from: location }} replace />
}

export default PrivateRoutes