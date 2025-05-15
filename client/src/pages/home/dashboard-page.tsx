import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import { singOutUser } from "@/api/auth"
import useAuth from "@/hooks/auth/use-auth"

const DashboardPage = () => {

    const { accessToken, setAccessToken } = useAuth()

    const handleSignOut = async (accessToken: string) => {
        try {
            await singOutUser(accessToken)
            toast.success('Signed out successfully.');
            setAccessToken('')
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