import { Outlet } from "react-router-dom"
import MarketingLayoutNavigation from "@/layouts/_components/marketing-layout-navigation"

const MarketingLayout = () => {
    return (
        <div className='grid w-full min-h-dvh h-auto grid-cols-1 grid-rows-[64px_1fr]'>
            <header className="bg-green-300">
                <MarketingLayoutNavigation />
            </header>
            <main className="flex flex-col min-h-[calc(100dvh-64px)] justify-center items-center ">
                <Outlet />
            </main>
        </div>
    )
}

export default MarketingLayout