import type { TListComponent } from "@/components/shared/_types";

export default function ListComponent<T>({
    as: Component = 'div', // Default to 'div' please. Can be overridden to example 'ul', 'ol' etc.
    className,
    data,
    renderItem,
    empty
}: TListComponent<T>) {
    return (
        <Component className={className}>
            {data?.length > 0
                ? data.map((item, index) => renderItem(item, index))
                : empty ?? null}
        </Component>
    );
}

