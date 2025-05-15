import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { singOutUser } from "@/api/auth"
import clientPaths from "@/configs/paths/client.paths.config"
import useAuth from "@/hooks/auth/use-auth"
import { Button } from "@/components/ui/button"

const DashboardPage = () => {

    const { accessToken } = useAuth()
    const navigate = useNavigate()

    const handleSignOut = async (accessToken: string) => {
        try {
            await singOutUser(accessToken)
            toast.success('Signed out successfully.');
            navigate(clientPaths.marketing.landing)
        } catch (error) {
            if (error instanceof Error) toast.error(error.message)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-red-500 ">
            <Button onClick={() => handleSignOut(accessToken)} >
                Sign Out
            </Button>
        </div>
    )
}

export default DashboardPage