import { Outlet } from "react-router-dom"
import MarketingLayoutNavigation from "@layouts/_components/marketing-layout-navigation"

const MarketingLayout = () => {
    return (
        <div>
            <header>
                <MarketingLayoutNavigation />
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default MarketingLayout