import { createContext } from "react";


const ProfileContext = createContext<TProfiles>({} as TProfiles)

interface TProfileProvider {
    children: React.ReactNode,
    profile: TProfiles
}

export function ProfileProvider({ children, profile }: TProfileProvider) {
    return (
        <ProfileContext.Provider value={profile}>
            {children}
        </ProfileContext.Provider>
    )
}


export default ProfileContext