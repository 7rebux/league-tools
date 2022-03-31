import { MouseEventHandler } from 'react';
export interface ButtonProps {
    title: string;
    variant?: 'primary' | 'secondary';
    onClick?: MouseEventHandler;
}
