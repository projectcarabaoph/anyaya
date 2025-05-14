import { NavLink } from "react-router-dom"

import clientPaths from "@configs/paths/client.paths.config"

const LandingPage = () => {
    return (
        <div className='flex w-full min-h-dvh h-auto justify-center items-center '>
            <div className="flex flex-col items-center justify-center gap-2">
                <h1>404 Page not found</h1>
                <NavLink to={clientPaths.marketing.landing} className='bg-slate-400 hover:bg-slate-400/90 p-2 rounded-md text-white w-24 text-center'>Go back</NavLink>
            </div>
        </div>
    )
}

export default LandingPage