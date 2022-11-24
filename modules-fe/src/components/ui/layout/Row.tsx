import { ReactNode } from 'react';
import './Row.css';
import { SpacingToken } from './types';

type Props = {
    children: ReactNode;
    gutter?: keyof typeof SpacingToken;
};

const Row = ({ children, gutter }: Props) => {
    return (
        <div className="Row" data-gutter={gutter}>
            {children}
        </div>
    );
};

export default Row;
