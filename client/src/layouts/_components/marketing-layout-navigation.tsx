import { NavLink } from "react-router-dom";

import ListComponent from "@/components/shared/list-component";
import { marketingLayoutNavLinks } from "@/utils/constants";

export default function MarketingLayoutNavigation() {
    return (
        <nav className="w-full ">
            <ListComponent
                as='ul'
                className="p-0 flex flex-row gap-2 h-full"
                data={marketingLayoutNavLinks}
                renderItem={(link) => (
                    <li key={link.id}>
                        <NavLink to={link.path} >
                            {link.name}
                        </NavLink>
                    </li>
                )}
            />
        </nav>
    )
}
