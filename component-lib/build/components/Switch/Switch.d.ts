import React from 'react';
interface Props {
    initialValue?: boolean;
    onValueChange?(value: boolean): void;
}
declare const Switch: React.FC<Props>;
export default Switch;
