import { ReactNode } from 'react';
import './List.css';

type Props = {
    children: ReactNode;
};

const List = ({ children }: Props) => <ul className="List">{children}</ul>;

export default List;
