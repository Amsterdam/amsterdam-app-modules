import {ReactNode} from 'react'
import './List.css'

type Props = {
  children: ReactNode
  withMarker?: boolean
}

const List = ({children, withMarker = false}: Props) => (
  <ul className="List" data-list-marker={withMarker}>
    {children}
  </ul>
)

export default List
