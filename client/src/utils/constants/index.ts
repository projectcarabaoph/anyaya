import clientPaths from '@/configs/paths/client.paths.config';
import type { TMarketingLayoutNavLinks } from '@/utils/_types';


export const marketingLayoutNavLinks: TMarketingLayoutNavLinks[] = [
    {
        id: 1,
        name: "Home",
        path: clientPaths.marketing.landing
    },
    {
        id: 1,
        name: "Sign In",
        path: clientPaths.auth.signin
    },
]