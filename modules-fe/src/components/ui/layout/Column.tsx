import { ReactNode } from 'react';
import './Column.css';
import './gutter.css';
import { SpacingToken } from './types';

type Props = {
    children: ReactNode;
    gutter?: keyof typeof SpacingToken;
};

const Column = ({ children, gutter }: Props) => {
    return (
        <div className="Column" data-gutter={gutter}>
            {children}
        </div>
    );
};

export default Column;
