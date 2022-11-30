import {ReactNode} from 'react'
import './ListItem.css'

type Props = {
  children: ReactNode
}

const ListItem = ({children}: Props) => <li className="ListItem">{children}</li>

export default ListItem
