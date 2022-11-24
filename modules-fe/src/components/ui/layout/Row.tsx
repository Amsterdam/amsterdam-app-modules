import { ReactNode } from 'react';
import './Row.css';
import './gutter.css';
import { CrossAxisAlignment, SpacingToken } from './types';

type Props = {
    children: ReactNode;
    gutter?: keyof typeof SpacingToken;
    valign?: CrossAxisAlignment;
};

const Row = ({ children, gutter, valign }: Props) => {
    return (
        <div className="Row" data-gutter={gutter} data-valign={valign}>
            {children}
        </div>
    );
};

export default Row;
