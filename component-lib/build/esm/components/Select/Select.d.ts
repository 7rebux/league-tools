import React from 'react';
type Item = {
    name: string;
    value: string;
};
interface Props {
    title?: string;
    initialItem: Item;
    items: Item[];
    onValueChange?(value: string): void;
}
declare const Select: React.FC<Props>;
export default Select;
