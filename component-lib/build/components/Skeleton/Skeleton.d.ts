import React from 'react';
interface Props {
    width: number;
    height: number;
    borderRadius?: string | number;
}
declare const Skeleton: React.FC<React.PropsWithChildren<Props>>;
export default Skeleton;
