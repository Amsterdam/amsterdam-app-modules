import {ReactNode} from 'react'
import './ListItem.css'

type Props = {
  children: ReactNode
}

const ListItem = ({children}: Props) => (
  <li className="ListItem" data-font="body">
    {children}
  </li>
)

export default ListItem
