import ListComponent from "@components/shared/list-component";
import { marketingLayoutNavLinks } from "@utils/constants";
import { NavLink } from "react-router-dom";

export default function MarketingLayoutNavigation() {
    return (
        <nav>
            <ListComponent
                as='ul'
                className="bg-black p-0 flex flex-col gap-2"
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
