import {ReactNode} from 'react'
import './List.css'

type Props = {
  children: ReactNode
  withMarker?: boolean
}

const List = ({children, withMarker = false}: Props) => (
  // We explicitly set the accessibility role for make Safari recognize this as a list.
  // https://developer.mozilla.org/en-US/docs/Web/CSS/list-style#accessibility_concerns
  // eslint-disable-next-line jsx-a11y/no-redundant-roles
  <ul className="List" data-list-marker={withMarker} role="list">
    {children}
  </ul>
)

export default List
