import { Outlet } from "react-router-dom"

import useProfile from "@/hooks/home/use-profile"

import HomeModalProvider from "@/layouts/_components/home-modal-provider"
import { ProfileProvider } from "@/contexts/profile-context"

const HomeLayout = () => {
    const { profile } = useProfile()
    return (
        <ProfileProvider profile={profile as TProfiles}>
            <HomeModalProvider />
            <div className='grid w-full min-h-dvh h-auto grid-cols-1 grid-rows-[64px_1fr]'>
                <header className="bg-green-300">
                    <div>Nav here</div>
                </header>
                <main className="flex flex-col min-h-[calc(100dvh-64px)] justify-center items-center ">
                    <Outlet />
                </main>
            </div>
        </ProfileProvider>
    )
}

export default HomeLayout