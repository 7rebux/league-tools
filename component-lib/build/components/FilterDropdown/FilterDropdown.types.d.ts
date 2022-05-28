import { Key } from 'react';
export interface FilterDropdownProps {
    title: string;
    searchBar?: boolean;
    items?: FilterDropdownItem[];
    onChange?: (items: FilterDropdownItem[]) => void;
}
export declare type FilterDropdownItem = {
    title: string;
    key: Key;
    value?: boolean;
};
