import { useContext } from "react"
import ProfileContext from "@/contexts/profile-context"

const useUserProfile = () => {
    const context = useContext(ProfileContext)
    if (!context) console.error('user profile hook should be used inside context provider')
    return context
}

export default useUserProfile