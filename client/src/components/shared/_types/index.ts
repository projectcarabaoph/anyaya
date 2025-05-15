export type TListComponent<T> = {
    as?: React.ElementType;
    className?: string;
    data: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    empty?: React.ReactNode
};