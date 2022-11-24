import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const ListItem = ({ children }: Props) => <li>{children}</li>;

export default ListItem;
